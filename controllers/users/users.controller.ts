import User from '../../models/users'
import mongoose from 'mongoose'
import { RequestHandler  } from 'express'
import { USER_TYPES } from './users.consts'
import {
	emailNotExist,
	invalidLoginOrPassword, invalidToken,
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

export const createUser:RequestHandler = (req, res) => {
	const { name, surname, mail, password, phoneNumber } = req.body

	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name,
		surname,
		mail,
		password: encryptPassword(password),
		dateOfCreation: new Date(),
		phoneNumber,
		accountType: USER_TYPES.REGULAR,
	})
	return user.save().then(user => onSuccess(user,201, res)).catch(error => onError(error, res))
}

export const updateUser:RequestHandler = (req, res) => {
	const userId = req.params.userId

	return User.findById(userId).select(['-password']).then(user => {
		if (user) {
			user.set(req.body)
			return user.save().then(user => onSuccess(user,200, res)).catch(error => onError(error, res))
		}
		else
			onNotFound(res)
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
	const { mail, password } = req.body
	return User.findOne({ mail }).then(user => {
		if (user) {
			const isPasswordMatch = passwordCompare(password, user.password)
			if(isPasswordMatch) {
				authorizeUser(user._id, res)
				onSuccess({ _id: user._id, role: user.accountType }, 200, res)
			}
			else
				invalidLoginOrPassword(res)
		}
		else
			invalidLoginOrPassword(res)
	}).catch(error => onError(error, res))
}

export const logOut:RequestHandler = (req, res) => {
	const { sessionUserId } = req.body
	res.clearCookie(`${sessionUserId}`)
	req.cookies['${sessionUserId}'] = ''
	return onSuccess({ message: getTranslation({ key: 'users.logOutSuccess' }) }, 200, res)
}

export const resetPassword:RequestHandler = async (req, res) => {
	const { mail } = req.body

	if (await emailExist(mail, res)) {
		const token = resetPasswordGenerateToken(mail)
		await sendEmail(mail, resetPasswordTemplate(token), `${process.env.WEBSITE_TITLE} resetowanie hasła`)
		onSuccess({ message: getTranslation({ key: 'users.resetPasswordEmailHasBeenSend' }) }, 200, res)
	} else {
		emailNotExist(res)
	}
}

export const changePassword:RequestHandler = async (req, res) => {
	const { mail, password } = req.body

	return User.findOne({ mail }).then(user => {
		if (user) {
			user.set({ password: encryptPassword(password) })
			return user.save().then(() => onSuccess({ message: getTranslation({ key: 'users.changePasswordSuccess' }) },200, res)).catch(error => onError(error, res))
		} else {
			invalidToken(res)
		}

	}).catch(error => onError(error, res))
}

export const verifyUser:RequestHandler = (req, res) => {
	const userId = req.params.userId

	return User.findById(userId).select(['-password']).then(user => {
		if (user) {
			user.set({ accountType: USER_TYPES.ORDERER })
			return user.save().then(user => onSuccess(user,200, res)).catch(error => onError(error, res))
		}
		else
			onNotFound(res)
	})
}