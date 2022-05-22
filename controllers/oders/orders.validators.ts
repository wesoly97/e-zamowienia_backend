import { check } from "express-validator"
import { getTranslation } from "../../utils/getTranslation"

export const orderValidator = [
    check('title')
        .notEmpty().withMessage(
            getTranslation({
                key: 'errors.titleIsEmpty',
                arg: getTranslation({ key: 'orders.oderField.title' })
            })
        )
        .isString().withMessage(
            getTranslation({
                key: 'errors.titleMustBeString',
                arg: getTranslation({ key: 'orders.oderField.title' })
          })
        )
]
