import {NextFunction, Request, Response} from "express"
import Users from "../../models/users"
import { fieldAlreadyExist } from "../../utils/handleRequestStatus"
import { getTranslation } from "../../utils/getTranslation"

export const checkEmailExist = (req: Request, res: Response, next: NextFunction) => {
    const { mail } = req.body

    return Users.findOne({ mail }).then(user => {
            if (user) {
                return fieldAlreadyExist(getTranslation({ key: 'users.emailExist' }), res)
            }
            else
                next()
        })
}