import { Request, Response } from "express"
import User from "../../models/users"
import mongoose from "mongoose"
import { USER_TYPES } from "./users.consts"
import { onError, onNotFound, onSuccess } from "../../utils/handleRequestStatus"

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

    return User.findById(userId).then(user => {
        if (user) {
            user.set(req.body)
            return user.save().then(user => onSuccess(user,200, res)).catch(error => onError(error, res))
        }
        else
            onNotFound(res)
    })
}