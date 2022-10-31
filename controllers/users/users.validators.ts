import { RequestHandler } from 'express'
import { fieldAlreadyExist } from '../../utils/handleRequestStatus'
import { check } from 'express-validator'
import { getTranslation } from '../../utils/getTranslation'
import { emailExist } from '../../utils/emailExist'
import { isDifferentPassword, isSamePasswords } from '../../middlewares/customValidators'

export const checkEmailExist:RequestHandler = async (req, res, next) => {
	const { email } = req.body

	if (!email) {
		return next()
	}

	if (await emailExist(email, res)) {
		return fieldAlreadyExist('users.emailExist', res)
	} else {
		return next()
	}
}

export const checkUserId = [
	check('userId')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'users.userField.userId' })
			})
		).isMongoId().withMessage(
			getTranslation({
				key: 'errors.mustBeMongoObjectId',
				arg: getTranslation({ key: 'users.userField.userId' })
			})
		),
]

export const checkEmail = [
	check('email')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'users.userField.email' })
			})
		).isEmail().withMessage(
			getTranslation({
				key: 'errors.mustBeEmail',
				arg: getTranslation({ key: 'users.userField.email' })
			})
		),
]

export const checkPassword = [
	check('password')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'users.userField.password' })
			})
		).isStrongPassword().withMessage(
			getTranslation({
				key: 'errors.invalidPasswordFormat',
			})
		),
]

export const checkRepeatPassword = [
	check('repeatPassword').custom(isSamePasswords).withMessage(
		getTranslation({ key: 'errors.passwordsNotMatch' })
	)
]
export const checkOldPassword = [
	check('currentPassword')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'users.userField.currentPassword' })
			})
		).custom(isDifferentPassword).withMessage(
			getTranslation({ key: 'errors.passwordsMatch' })
		)
]

export const userValidator = [
	check('name')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'users.userField.name' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'users.userField.name' })
			})
		),
	check('surname')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'users.userField.surname' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'users.userField.surname' })
			})
		)
]

export const userUpdateValidator = [
	check('name').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.name' })
		})
	),
	check('surname').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.surname' })
		})
	),
	check('email').optional().isEmail().withMessage(
		getTranslation({
			key: 'errors.mustBeEmail',
			arg: getTranslation({ key: 'users.userField.email' })
		})
	),
	check('password').optional().isStrongPassword().withMessage(
		getTranslation({
			key: 'errors.invalidPasswordFormat',
		})
	),
	check('phoneNumber').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.phoneNumber' })
		})
	)
]

export const userVerificationValidator = [
	check('phoneNumber').isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.phoneNumber' })
		})
	),
	check('country').isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.country' })
		})
	),
	check('companyName').isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.companyName' })
		})
	),
	check('nip').isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.nip' })
		})
	)
]