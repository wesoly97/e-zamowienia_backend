import { check } from "express-validator"
import { getTranslation } from "../../utils/getTranslation"

export const orderValidator = [
    check('title').notEmpty().withMessage(getTranslation('titleIsEmpty')).isString().withMessage(getTranslation('titleMustBeString'))
]
