import { check } from 'express-validator'
import { getTranslation } from '../../utils/getTranslation'
import {
	isCategoryValid,
	isFileDocumentFormatValid,
	isFileDocumentSizeValid,
	isFirstCharNumberOrLetter,
	isModeValid
} from '../../middlewares/customValidators'

export const orderValidator = [
	check('title')
		.isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.title' })
			})
		).isLength({ min: 3, max: 255 }).withMessage(
			getTranslation({
				key: 'errors.invalidRange',
				arg: { fieldName: getTranslation({ key: 'orders.orderField.title' }), min: '3', max: '255' }
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
		).custom(isModeValid).withMessage(
			getTranslation({
				key: 'errors.invalidValue',
				arg: getTranslation({ key: 'orders.orderField.mode' })
			})),
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
		).isLength({ max: 2048 }).withMessage(
			getTranslation({
				key: 'errors.invalidLMaxLength',
				arg: { fieldName: getTranslation({ key: 'orders.orderField.description' }), length: '2048' }
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
		).custom(isCategoryValid).withMessage(
			getTranslation({
				key: 'errors.invalidValue',
				arg: getTranslation({ key: 'orders.orderField.category' })
			})),
	check('procedureIdentifier')
		.isString().withMessage(
			getTranslation({
				key: 'errors.mustBeString',
				arg: getTranslation({ key: 'orders.orderField.procedureIdentifier' })
			})
		).isLength({ min: 3, max: 255 }).withMessage(
			getTranslation({
				key: 'errors.invalidRange',
				arg: { fieldName: getTranslation({ key: 'orders.orderField.procedureIdentifier' }), min: '3', max: '255' }
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
	).isLength({ min: 3, max: 255 }).withMessage(
		getTranslation({
			key: 'errors.invalidRange',
			arg: { fieldName: getTranslation({ key: 'orders.orderField.title' }), min: '3', max: '255' }
		})
	),
	check('mode').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.mode' })
		})
	).custom(isModeValid).withMessage(
		getTranslation({
			key: 'errors.invalidValue',
			arg: getTranslation({ key: 'orders.orderField.mode' })
		})),
	check('description').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.description' })
		})
	).isLength({ max: 2048 }).withMessage(
		getTranslation({
			key: 'errors.invalidLMaxLength',
			arg: { fieldName: getTranslation({ key: 'orders.orderField.description' }), length: '2048' }
		})
	),
	check('category').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.category' })
		})
	).custom(isCategoryValid).withMessage(
		getTranslation({
			key: 'errors.invalidValue',
			arg: getTranslation({ key: 'orders.orderField.category' })
		})),
	check('procedureIdentifier').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
			arg: getTranslation({ key: 'orders.orderField.procedureIdentifier' })
		})
	).isLength({ min: 3, max: 255 }).withMessage(
		getTranslation({
			key: 'errors.invalidRange',
			arg: { fieldName: getTranslation({ key: 'orders.orderField.procedureIdentifier' }), min: '3', max: '255' }
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
	check('price').optional().isString().withMessage(
		getTranslation({
			key: 'errors.mustBeString',
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