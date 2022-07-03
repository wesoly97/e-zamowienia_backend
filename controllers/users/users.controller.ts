import User from "../../models/users"
import mongoose from "mongoose"
import { Request, Response } from "express"
import { USER_TYPES } from "./users.consts"
import { onError, onNotFound, onSuccess } from "../../utils/handleRequestStatus"
import { getTranslation } from "../../utils/getTranslation"

export const createUser = (req: Request, res: Response) => {
    const { name, surname, mail, password, phoneNumber } = req.body

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        surname,
        mail,
        password,
        dateOfCreation: new Date(),
        phoneNumber,
        accountType: USER_TYPES.REGULAR
    })
    return user.save().then(user => onSuccess(user,201, res)).catch(error => onError(error, res))
}

export const updateUser = (req: Request, res: Response) => {
    const userId = req.params.userId

    return User.findById(userId).select(['-password']).then(user => {
        if (user) {
            user.set(req.body)
            return user.save().then(user => onSuccess(user,200, res)).catch(error => onError(error, res))
        }
        else
            onNotFound(res)
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId

    return User.findByIdAndDelete(userId).then(user => user ?
        onSuccess({ message: getTranslation({ key: 'users.deleteConfirmation' })},200, res)
        : onNotFound(res)).catch(error => onError(error, res))
}

export const getUserData = (req: Request, res: Response) => {
    const userId = req.params.userId
    return User.findById(userId).select(['-password']).then(
        user => user ? onSuccess(user, 200, res) : onNotFound(res)
    ).catch(error => onError(error, res))
}

export const getUsers = (req: Request, res: Response) => User.find().select(['-password'])
    .then(users => onSuccess(users,200, res)).catch(error => onError(error, res))

export const emailIsValid = (req: Request, res: Response) => onSuccess({
    message: getTranslation({ key: 'users.emailIsValid' })
    },200, res)
