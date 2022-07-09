import {NextFunction, Request, Response} from "express"
import Users from "../../models/users"
import { fieldAlreadyExist, onError } from "../../utils/handleRequestStatus"
import { check } from "express-validator"
import { getTranslation } from "../../utils/getTranslation"

export const checkEmailExist = (req: Request, res: Response, next: NextFunction) => {
    const { mail } = req.body

    if(!mail)
        return next()

    return Users.findOne({ mail }).then(user => {
            if (user) {
                return fieldAlreadyExist('users.emailExist', res)
            }
            else
                return next()
        }).catch(error => onError(error, res))
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
    check('mail')
        .notEmpty().withMessage(
        getTranslation({
            key: 'errors.isEmpty',
            arg: getTranslation({ key: 'users.userField.mail' })
        })
    ).isEmail().withMessage(
        getTranslation({
            key: 'errors.mustBeEmail',
            arg: getTranslation({ key: 'users.userField.mail' })
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
    check('mail').optional().isEmail().withMessage(
        getTranslation({
            key: 'errors.mustBeEmail',
            arg: getTranslation({ key: 'users.userField.mail' })
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