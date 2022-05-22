import { check } from "express-validator"
import { getTranslation } from "../../utils/getTranslation"

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
    check('customerName')
        .notEmpty().withMessage(
            getTranslation({
                key: 'errors.isEmpty',
                arg: getTranslation({ key: 'orders.orderField.customerName' })
            })
        ).isString().withMessage(
            getTranslation({
                key: 'errors.mustBeString',
                arg: getTranslation({ key: 'orders.orderField.customerName' })
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
    check('files')
        .optional().isArray().withMessage(
        getTranslation({
            key: 'errors.mustBeArray',
            arg: getTranslation({ key: 'orders.orderField.files' })
        })
    ),
    check('expirationDate')
        .notEmpty().withMessage(getTranslation({
            key: 'errors.isEmpty',
            arg: getTranslation({ key: 'orders.orderField.expirationDate' })
        })
    ).isDate().withMessage(
        getTranslation({
            key: 'errors.mustBeDate',
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
    ).isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'orders.orderField.orderId' })
        })
    ),
]

export const orderUpdateValidator = [
    check('orderId')
        .notEmpty().withMessage(
        getTranslation({
            key: 'errors.isEmpty',
            arg: getTranslation({ key: 'orders.orderField.orderId' })
        })
    ).isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'orders.orderField.orderId' })
        })
    ),
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
    check('customerName').optional().isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'orders.orderField.customerName' })
        })
    ),
    check('procedureIdentifier').optional().isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'orders.orderField.procedureIdentifier' })
        })
    ),
    check('files')
        .optional().isArray().withMessage(
        getTranslation({
            key: 'errors.mustBeArray',
            arg: getTranslation({ key: 'orders.orderField.files' })
        })
    ),
    check('expirationDate').optional().isDate().withMessage(
        getTranslation({
            key: 'errors.mustBeDate',
            arg: getTranslation({ key: 'orders.orderField.expirationDate' })
        })
    )
]