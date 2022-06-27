import {NextFunction, Request, Response} from "express"
import Users from "../../models/users"
import { fieldAlreadyExist } from "../../utils/handleRequestStatus"
import { check } from "express-validator"
import { getTranslation } from "../../utils/getTranslation"

export const checkEmailExist = (req: Request, res: Response, next: NextFunction) => {
    const { mail } = req.body

    return Users.findOne({ mail }).then(user => {
            if (user) {
                return fieldAlreadyExist('users.emailExist', res)
            }
            else
                next()
        })
}

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
    ),
    check('mail')
        .notEmpty().withMessage(
        getTranslation({
            key: 'errors.isEmpty',
            arg: getTranslation({ key: 'users.userField.mail' })
        })
    ).isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'users.userField.mail' })
        })
    ),
    check('password')
        .notEmpty().withMessage(
        getTranslation({
            key: 'errors.isEmpty',
            arg: getTranslation({ key: 'users.userField.password' })
        })
    ).isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'users.userField.password' })
        })
    ),
    check('phoneNumber')
        .notEmpty().withMessage(
        getTranslation({
            key: 'errors.isEmpty',
            arg: getTranslation({ key: 'users.userField.phoneNumber' })
        })
    ).isString().withMessage(
        getTranslation({
            key: 'errors.mustBeString',
            arg: getTranslation({ key: 'users.userField.phoneNumber' })
        })
    )
]