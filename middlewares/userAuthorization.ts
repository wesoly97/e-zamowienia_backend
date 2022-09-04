import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { CookieOptions, RequestHandler, Response } from 'express'
import { notLogged } from '../utils/handleRequestStatus'

const NUMBER_OF_DAYS_COOKIE_EXPIRED = 2
const RESET_PASSWORD_EXPIRE_TIME = 15

const COOKIE_CONFIG: CookieOptions = {
	path: '/',
	expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * NUMBER_OF_DAYS_COOKIE_EXPIRED),
	httpOnly: true,
	sameSite: 'lax'
}

export const authorizeUser = (userId: string, res:Response) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY as string, {
		expiresIn: `${NUMBER_OF_DAYS_COOKIE_EXPIRED} days`
	})
	res.cookie(userId as string, token, COOKIE_CONFIG)
}

export const isUserLogged:RequestHandler = (req, res, next) => {
	const token = req.headers.cookie?.split('=')[1]
	const verifyTokenCallback = (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
		if(err) {
			notLogged(res)
		}
		req.body.sessionUserId = (<JwtPayload | undefined>decoded)?.id
		return next()
	}

	if(!token)
		return notLogged(res)

	jwt.verify(token as string, process.env.JWT_SECRET_KEY as string, verifyTokenCallback)
}

export const resetPasswordGenerateToken = (mail: string) => {
	const token = jwt.sign({ mail: mail }, process.env.JWT_SECRET_KEY as string + mail, {
		expiresIn: `${RESET_PASSWORD_EXPIRE_TIME} min`
	})
	return token
}