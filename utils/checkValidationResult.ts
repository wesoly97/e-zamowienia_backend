import { validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express"

export const checkValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    else
        next()
}
