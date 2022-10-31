import User from '../../models/users'
import mongoose from 'mongoose'
import { RequestHandler  } from 'express'
import { USER_TYPES } from './users.consts'
import {
	emailNotExist,
	invalidLoginOrPassword, invalidPassword,
	invalidToken,
	onError,
	onNotFound,
	onSuccess
} from '../../utils/handleRequestStatus'
import { getTranslation } from '../../utils/getTranslation'
import { encryptPassword, passwordCompare } from '../../middlewares/passwordEncryption'
import { authorizeUser, resetPasswordGenerateToken } from '../../middlewares/userAuthorization'
import { emailExist } from '../../utils/emailExist'
import { sendEmail } from '../../middlewares/emailSender'
import { resetPasswordTemplate } from '../../templates/emails/resetPassword'
import UserVerification from '../../models/userVerification'
import { IUserVerificationModel } from '../../models/userVerification.types'
import { IUserModel } from '../../models/users.types'
import { getUserData as getUser } from './users.utils'

export const createUser:RequestHandler = (req, res) => {
	const { name, surname, email, password } = req.body

	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name,
		surname,
		email,
		password: encryptPassword(password),
		dateOfCreation: new Date(),
		accountType: USER_TYPES.REGULAR,
		phoneNumber: '',
		country: '',
		nip: '',
		companyName: '',
	})
	return user.save().then(user => {
		authorizeUser(user._id, res)
		onSuccess(user,201, res)
	}).catch(error => onError(error, res))
}

export const updateUser:RequestHandler = (req, res) => {
	const userId = req.params.userId

	return User.findById(userId).select(['-password']).then(user => {
		if (user) {
			user.set(req.body)
			return user.save().then(user => onSuccess(user,200, res)).catch(error => onError(error, res))
		} else {
			onNotFound(res)
		}
	})
}

export const deleteUser:RequestHandler = (req, res) => {
	const userId = req.params.userId

	return User.findByIdAndDelete(userId).then(user => user ?
		onSuccess({ message: getTranslation({ key: 'users.deleteConfirmation' }) },200, res)
		: onNotFound(res)).catch(error => onError(error, res))
}

export const getUserData:RequestHandler = (req, res) => {
	const userId = req.params.userId
	return User.findById(userId).select(['-password']).then(
		user => user ? onSuccess(user, 200, res) : onNotFound(res)
	).catch(error => onError(error, res))
}

export const getUsers:RequestHandler = (req, res) => User.find().select(['-password'])
	.then(users => onSuccess(users,200, res)).catch(error => onError(error, res))

export const emailIsValid:RequestHandler = (req, res) => onSuccess({
	message: getTranslation({ key: 'users.emailIsValid' })
},200, res)

export const logIn:RequestHandler = (req, res) => {
	const { email, password } = req.body
	return User.findOne({ email }).then(user => {
		if (user) {
			const isPasswordMatch = passwordCompare(password, user.password)
			if(isPasswordMatch) {
				authorizeUser(user._id, res)
				onSuccess({ _id: user._id, role: user.accountType }, 200, res)
			} else {
				invalidLoginOrPassword(res)
			}
		} else {
			invalidLoginOrPassword(res)
		}
	}).catch(error => onError(error, res))
}

export const logOut:RequestHandler = (req, res) => {
	const { sessionUserId } = req.body
	res.clearCookie(`${sessionUserId}`, { sameSite: 'none', secure: true })
	return onSuccess({ message: getTranslation({ key: 'users.logOutSuccess' }) }, 200, res)
}

export const recoverPassword:RequestHandler = async (req, res) => {
	const { email } = req.body

	if (await emailExist(email, res)) {
		const token = resetPasswordGenerateToken(email)
		await sendEmail(email, resetPasswordTemplate(token), `${process.env.WEBSITE_TITLE} resetowanie hasła`)
		onSuccess({ message: getTranslation({ key: 'users.resetPasswordEmailHasBeenSend' }) }, 200, res)
	} else {
		emailNotExist(res)
	}
}

export const resetPassword:RequestHandler = async (req, res) => {
	const { email, password } = req.body

	return User.findOne({ email }).then(user => {
		if (user) {
			user.set({ password: encryptPassword(password) })
			return user.save().then(() => onSuccess({ message: getTranslation({ key: 'users.changePasswordSuccess' }) },200, res)).catch(error => onError(error, res))
		} else {
			invalidToken(res)
		}

	}).catch(error => onError(error, res))
}

export const changePassword:RequestHandler = async (req, res) => {
	const { sessionUserId, password, currentPassword } = req.body
	const userProperties = { password: 1 }
	const user = await getUser(sessionUserId, res, userProperties) as IUserModel
	const isPasswordMatch = passwordCompare(currentPassword, user.password)

	if(!isPasswordMatch) {
		return invalidPassword(res)
	}

	user.set({ password: encryptPassword(password) })
	return user.save().then(() => onSuccess({ message: getTranslation({ key: 'users.changePasswordSuccess' }) },200, res)).catch(error => onError(error, res))
}


export const verifyUser:RequestHandler = async (req, res) => {
	const userId = req.params.userId
	const userVerification = await UserVerification.findById(userId).catch(error => onError(error, res)) as IUserVerificationModel
	const user = await User.findById(userId).select({ accountType: 1, phoneNumber: 1, country: 1, nip: 1, companyName: 1 })
	if (user && userVerification) {
		user.set({ ...userVerification.toObject(), accountType: USER_TYPES.ORDERER })
		userVerification.delete()
		return user.save().then(user => onSuccess(user,200, res)).catch(error => onError(error, res))
	} else {
		onNotFound(res)
	}
}

export const denyVerifyUser:RequestHandler = async (req, res) => {
	const userId = req.params.userId

	return UserVerification.findByIdAndDelete(userId).then(user => user ?
		onSuccess({ message: getTranslation({ key: 'users.denyVerificationConfirmation' }) },200, res)
		: onNotFound(res)).catch(error => onError(error, res))
}

export const createVerifyRequest:RequestHandler = async (req, res) => {
	const { nip, phoneNumber, country, companyName, sessionUserId } = req.body
	const userVerification = await UserVerification.findById(sessionUserId).catch(error => onError(error, res)) as IUserVerificationModel
	const userVerificationData = { _id: sessionUserId, nip, phoneNumber, country, companyName }

	if(!userVerification) {
		const newUserVerification = new UserVerification(userVerificationData)
		newUserVerification.save().then(UserVerificationData => onSuccess(UserVerificationData,200, res)).catch(error => onError(error, res))
	} else {
		userVerification.set(userVerificationData)
		userVerification.save().then(() => onSuccess(userVerificationData,200, res)).catch(error => onError(error, res))
	}
}

export  const getSessionData:RequestHandler = (req, res) => {
	const { sessionUserId } = req.body

	return User.findById(sessionUserId).select({ accountType: 1 }).then(user => {
		if (user) {
			onSuccess(user, 200, res)
		} else {
			onNotFound(res)
		}
	})
}

export const getUsersVerificationList:RequestHandler = (req, res) => UserVerification.find()
	.then(users => onSuccess(users,200, res)).catch(error => onError(error, res))