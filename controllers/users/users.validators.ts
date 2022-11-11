import { RequestHandler } from 'express'
import { fieldAlreadyExist } from '../../utils/handleRequestStatus'
import { check } from 'express-validator'
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
		.notEmpty().withMessage((value, { req }) => req.__('errors.isEmpty',  req.__('users.userField.userId')))
		.isMongoId().withMessage((value, { req }) => req.__('errors.mustBeMongoObjectId', req.__('users.userField.userId')))
]

export const checkEmail = [
	check('email')
		.notEmpty().withMessage((value, { req }) => req.__('errors.isEmpty', req.__('users.userField.email')))
		.isEmail().withMessage((value, { req }) => req.__('errors.mustBeEmail', req.__('users.userField.email')))
]

export const checkPassword = [
	check('password').isStrongPassword().withMessage((value, { req }) => req.__('errors.invalidPasswordFormat'))
]

export const checkRepeatPassword = [
	check('repeatPassword').custom(isSamePasswords).withMessage((value, { req }) => req.__('errors.passwordsNotMatch'))
]

export const checkOldPassword = [
	check('currentPassword')
		.notEmpty().withMessage((value, { req }) => req.__('errors.isEmpty', req.__('users.userField.currentPassword') ))
		.custom(isDifferentPassword).withMessage((value, { req }) => req.__('errors.passwordsMatch'))
]

export const userValidator = [
	check('name')
		.isString().withMessage((value, { req }) => req.__('errors.mustBeString', req.__('users.userField.name')))
		.isLength({ min: 3, max: 64 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('users.userField.name'), min: '3', max: '64' })),
	check('surname')
		.isString().withMessage((value, { req }) => req.__('errors.mustBeString', req.__('users.userField.surname')))
		.isLength({ min: 3, max: 64 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('users.userField.surname'), min: '3', max: '64' }))
]

export const userUpdateValidator = [
	check('name').optional().notEmpty().isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('users.userField.name')))
		.isLength({ min: 3, max: 64 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName:req.__('users.userField.name'), min: '3', max: '64' })),
	check('surname').optional().isString().withMessage(
		(value, { req }) => req.__('errors.mustBeString', req.__('users.userField.surname')))
		.isLength({ min: 3, max: 64 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('users.userField.surname'), min: '3', max: '64' }))
]

export const userVerificationValidator = [
	check('phoneNumber').notEmpty().withMessage((value, { req }) =>
		req.__('errors.isEmpty', req.__('users.userField.phoneNumber')))
		.isString().withMessage((value, { req }) =>
			req.__('errors.mustBeString', req.__('users.userField.phoneNumber'))),
	check('country').isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('users.userField.country')))
		.isLength({ min: 4, max: 56 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('users.userField.country'), min: '4', max: '56' })),
	check('companyName').isString().withMessage(
		(value, { req }) => req.__('errors.mustBeString', req.__('users.userField.companyName')))
		.isLength({ min: 3, max: 255 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('users.userField.companyName'), min: '3', max: '255' })),
	check('nip').notEmpty().withMessage((value, { req }) => req.__('errors.isEmpty',
		req.__('users.userField.nip')))
		.isString().withMessage(
			(value, { req }) => req.__('errors.mustBeString', req.__('users.userField.nip')))
]