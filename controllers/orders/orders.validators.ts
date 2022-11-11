import { check } from 'express-validator'
import {
	isCategoryValid,
	isFileDocumentFormatValid,
	isFileDocumentSizeValid,
	isFirstCharNumberOrLetter,
	isModeValid
} from '../../middlewares/customValidators'

export const orderValidator = [
	check('title')
		.isString().withMessage((value, { req }) => req.__('errors.mustBeString', req.__('orders.orderField.title')))
		.isLength({ min: 3, max: 255 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('orders.orderField.title'), min: '3', max: '255' })),
	check('mode')
		.notEmpty().withMessage((value, { req }) => req.__('errors.isEmpty', req.__('orders.orderField.mode')))
		.isString().withMessage(
			(value, { req }) => req.__('errors.mustBeString', req.__('orders.orderField.mode')))
		.custom(isModeValid).withMessage((value, { req }) =>
			req.__('errors.invalidValue', req.__('orders.orderField.mode'))),
	check('description')
		.notEmpty().withMessage(
			(value, { req }) => req.__('errors.isEmpty', req.__('orders.orderField.description')))
		.isString().withMessage(
			(value, { req }) => req.__('errors.mustBeString', req.__('orders.orderField.description')))
		.isLength({ max: 2048 }).withMessage((value, { req }) =>
			req.__('errors.invalidLMaxLength', { fieldName: req.__('orders.orderField.description'), length: '2048' })),
	check('category')
		.notEmpty().withMessage((value, { req }) =>
			req.__('errors.isEmpty', req.__('orders.orderField.category')))
		.isString().withMessage((value, { req }) =>
			req.__('errors.mustBeString', req.__('orders.orderField.category')))
		.custom(isCategoryValid).withMessage((value, { req }) =>
			req.__('errors.invalidValue', req.__('orders.orderField.category'))),
	check('procedureIdentifier')
		.isString().withMessage((value, { req }) =>
			req.__('errors.mustBeString', req.__('orders.orderField.procedureIdentifier')))
		.isLength({ min: 3, max: 255 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('orders.orderField.procedureIdentifier'), min: '3', max: '255' })),
	check('files').custom(isFileDocumentFormatValid).withMessage((value, { req }) =>
		req.__('errors.invalidFileFormat',
			req.__('orders.orderField.files')))
		.custom(isFileDocumentSizeValid).withMessage((value, { req }) =>
			req.__('errors.invalidFileSize', req.__('orders.orderField.files'))),
	check('price')
		.notEmpty().isNumeric().withMessage((value, { req }) =>
			req.__('errors.mustBeNumber', req.__('orders.orderField.price'))),
	check('expirationDate')
		.isDate().withMessage((value, { req }) =>
			req.__('errors.mustBeDate', req.__('orders.orderField.expirationDate')))
		.notEmpty().withMessage((value, { req }) =>
			req.__('errors.isEmpty', req.__('orders.orderField.expirationDate')))
]

export const checkOrderId = [
	check('orderId')
		.notEmpty().withMessage((value, { req }) =>
			req.__('errors.isEmpty', req.__('orders.orderField.orderId')))
		.isMongoId().withMessage((value, { req }) =>
			req.__('errors.mustBeMongoObjectId', req.__('orders.orderField.orderId')))
]

export const orderUpdateValidator = [
	check('title').optional().isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('orders.orderField.title')))
		.isLength({ min: 3, max: 255 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('orders.orderField.title'), min: '3', max: '255' })),
	check('mode').optional().isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('orders.orderField.mode')))
		.custom(isModeValid).withMessage((value, { req }) =>
			req.__('errors.invalidValue', req.__('orders.orderField.mode'))),
	check('description').optional().isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('orders.orderField.description')))
		.isLength({ max: 2048 }).withMessage((value, { req }) =>
			req.__('errors.invalidLMaxLength', { fieldName: req.__('orders.orderField.description'), length: '2048' })),
	check('category').optional().isString().withMessage(
		(value, { req }) => req.__('errors.mustBeString', req.__('orders.orderField.category')))
		.custom(isCategoryValid).withMessage((value, { req }) =>
			req.__('errors.invalidValue', req.__('orders.orderField.category'))),
	check('procedureIdentifier').optional().isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('orders.orderField.procedureIdentifier')))
		.isLength({ min: 3, max: 255 }).withMessage((value, { req }) =>
			req.__('errors.invalidRange', { fieldName: req.__('orders.orderField.procedureIdentifier'), min: '3', max: '255' })),
	check('files').optional().custom(isFileDocumentFormatValid).withMessage((value, { req }) =>
		req.__('errors.invalidFileFormat', req.__('orders.orderField.files')))
		.custom(isFileDocumentSizeValid).withMessage((value, { req }) =>
			req.__('errors.invalidFileSize', req.__('orders.orderField.files'))),
	check('price').optional().isString().withMessage((value, { req }) =>
		req.__('errors.mustBeString', req.__('orders.orderField.price'))),
	check('expirationDate').optional().isDate().withMessage(
		(value, { req }) => req.__('errors.mustBeDate', req.__('orders.orderField.expirationDate')))
]

export const getOrdersValidator = [
	check('filterOption.title')
		.optional().isString().withMessage((value, { req }) =>
			req.__('errors.mustBeString', req.__('orders.orderField.title')))
		.custom(isFirstCharNumberOrLetter).withMessage((value, { req }) =>
			req.__('errors.mustStartWithLetterOrNumber')),
	check('filterOption.mode')
		.optional().isString().withMessage((value, { req }) =>
			req.__('errors.mustBeString', req.__('orders.orderField.mode')))
		.custom(isFirstCharNumberOrLetter).withMessage((value, { req }) =>
			req.__('errors.mustStartWithLetterOrNumber')),
	check('filterOption.category')
		.optional().isString().withMessage((value, { req }) =>
			req.__('errors.mustBeString', req.__('orders.orderField.category')))
		.custom(isFirstCharNumberOrLetter).withMessage((value, { req }) => req.__('errors.mustStartWithLetterOrNumber')),
]