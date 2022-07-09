import { validationResult } from "express-validator"
import { RequestHandler } from "express"
import { invalidLoginOrPassword } from "./handleRequestStatus"

export const checkValidationResult:RequestHandler = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    else
        next()
}

export const checkLoginValidationResult:RequestHandler = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return invalidLoginOrPassword(res)
    }
    else
        next()
}