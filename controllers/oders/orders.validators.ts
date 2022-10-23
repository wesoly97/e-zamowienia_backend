import { check } from 'express-validator'
import { getTranslation } from '../../utils/getTranslation'
import {
	isFileDocumentFormatValid,
	isFileDocumentSizeValid,
	isFirstCharNumberOrLetter
} from '../../middlewares/customValidators'

export const orderValidator = [
	check('title')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'orders.orderField.title' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.title' })
			})
		),
	check('mode')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'orders.orderField.mode' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.mode' })
			})
		),
	check('description')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'orders.orderField.description' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.description' })
			})
		),
	check('category')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'orders.orderField.category' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.category' })
			})
		),
	check('procedureIdentifier')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'orders.orderField.procedureIdentifier' })
			})
		).isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.procedureIdentifier' })
			})
		),
	check('files').custom(isFileDocumentFormatValid).withMessage(
		getTranslation({
			key: 'errors.invalidFileFormat',
			arg: getTranslation({ key: 'orders.orderField.files' })
		})).custom(isFileDocumentSizeValid).withMessage(
		getTranslation({
			key: 'errors.invalidFileSize',
			arg: getTranslation({ key: 'orders.orderField.files' })
		})),
	check('price')
		.notEmpty().isNumeric().withMessage(
			getTranslation({
				key: 'errors.mustBeNumber',
				arg: getTranslation({ key: 'orders.orderField.price' })
			})
		),
	check('expirationDate')
		.isDate().withMessage(
			getTranslation({
				key: 'errors.mustBeDate',
				arg: getTranslation({ key: 'orders.orderField.expirationDate' })
			})
		)
		.notEmpty().withMessage(getTranslation({
			key: 'errors.isEmpty',
			arg: getTranslation({ key: 'orders.orderField.expirationDate' })
		})
		)
]

export const checkOrderId = [
	check('orderId')
		.notEmpty().withMessage(
			getTranslation({
				key: 'errors.isEmpty',
				arg: getTranslation({ key: 'orders.orderField.orderId' })
			})
		).isMongoId().withMessage(
			getTranslation({
				key: 'errors.mustBeMongoObjectId',
				arg: getTranslation({ key: 'orders.orderField.orderId' })
			})
		),
]

export const orderUpdateValidator = [
	check('title').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.title' })
		})
	),
	check('mode').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.mode' })
		})
	),
	check('description').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.description' })
		})
	),
	check('category').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.category' })
		})
	),
	check('procedureIdentifier').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.procedureIdentifier' })
		})
	),
	check('files').optional().custom(isFileDocumentFormatValid).withMessage(
		getTranslation({
			key: 'errors.invalidFileFormat',
			arg: getTranslation({ key: 'orders.orderField.files' })
		})).custom(isFileDocumentSizeValid).withMessage(
		getTranslation({
			key: 'errors.invalidFileSize',
			arg: getTranslation({ key: 'orders.orderField.files' })
		})),
	check('price')
		.isNumeric().withMessage(
			getTranslation({
				key: 'errors.mustBeNumber',
				arg: getTranslation({ key: 'orders.orderField.price' })
			})
		),
	check('expirationDate').optional().isDate().withMessage(
		getTranslation({
			key: 'errors.mustBeDate',
			arg: getTranslation({ key: 'orders.orderField.expirationDate' })
		})
	)
]

export const getOrdersValidator = [
	check('filterOption.title')
		.optional().isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.title' })
			})
		).custom(isFirstCharNumberOrLetter).withMessage(
			getTranslation({ key: 'errors.mustStartWithLetterOrNumber' })),
	check('filterOption.mode')
		.optional().isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.mode' })
			})
		).custom(isFirstCharNumberOrLetter).withMessage(
			getTranslation({ key: 'errors.mustStartWithLetterOrNumber' })),
	check('filterOption.category')
		.optional().isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.category' })
			})
		).custom(isFirstCharNumberOrLetter).withMessage(
			getTranslation({ key: 'errors.mustStartWithLetterOrNumber' })),
]