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
	check('password').isStrongPassword().withMessage(
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
		.isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'users.userField.name' })
			})
		).isLength({ min: 3, max: 64 }).withMessage(
			getTranslation({
				key: 'errors.invalidRange',
				arg: { fieldName: getTranslation({ key: 'users.userField.name' }), min: '3', max: '64' }
			})
		),
	check('surname')
		.isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'users.userField.surname' })
			})
		).isLength({ min: 3, max: 64 }).withMessage(
			getTranslation({
				key: 'errors.invalidRange',
				arg: { fieldName: getTranslation({ key: 'users.userField.surname' }), min: '3', max: '64' }
			})
		)
]

export const userUpdateValidator = [
	check('name').optional().notEmpty().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.name' })
		})
	).isLength({ min: 3, max: 64 }).withMessage(
		getTranslation({
			key: 'errors.invalidRange',
			arg: { fieldName: getTranslation({ key: 'users.userField.name' }), min: '3', max: '64' }
		})
	),
	check('surname').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.surname' })
		})
	).isLength({ min: 3, max: 64 }).withMessage(
		getTranslation({
			key: 'errors.invalidRange',
			arg: { fieldName: getTranslation({ key: 'users.userField.surname' }), min: '3', max: '64' }
		})
	)
]

export const userVerificationValidator = [
	check('phoneNumber').notEmpty().withMessage(
		getTranslation({
			key: 'errors.isEmpty',
			arg: getTranslation({ key: 'users.userField.phoneNumber' })
		})
	).isString().withMessage(
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
	).isLength({ min: 4, max: 56 }).withMessage(
		getTranslation({
			key: 'errors.invalidRange',
			arg: { fieldName: getTranslation({ key: 'users.userField.country' }), min: '4', max: '56' }
		})
	),
	check('companyName').isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.companyName' })
		})
	).isLength({ min: 3, max: 255 }).withMessage(
		getTranslation({
			key: 'errors.invalidRange',
			arg: { fieldName: getTranslation({ key: 'users.userField.companyName' }), min: '3', max: '255' }
		})
	),
	check('nip').notEmpty().withMessage(
		getTranslation({
			key: 'errors.isEmpty',
			arg: getTranslation({ key: 'users.userField.nip' })
		})
	).isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'users.userField.nip' })
		})
	)
]