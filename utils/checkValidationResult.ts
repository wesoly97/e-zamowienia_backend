import { validationResult } from 'express-validator'
import { RequestHandler } from 'express'
import { invalidLoginOrPassword } from './handleRequestStatus'

export const checkValidationResult:RequestHandler = (req, res, next) => {
	const errors = validationResult(req)
	const errorsFormatted = errors.array().map(error => ({ message: error.msg, key: error.param }))

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errorsFormatted })
	} else {
		next()
	}
}

export const checkLoginValidationResult:RequestHandler = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return invalidLoginOrPassword(res)
	}
	else {
		next()
	}
}