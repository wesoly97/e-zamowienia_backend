import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { CookieOptions, RequestHandler, Response } from 'express'
import { invalidToken, notAdministrator, notLogged, notVerified } from '../utils/handleRequestStatus'
import { IUserModel } from '../models/users.types'
import { getUserData } from '../controllers/users/users.utils'
import { USER_TYPES } from '../controllers/users/users.consts'

const NUMBER_OF_DAYS_COOKIE_EXPIRED = 2
const RESET_PASSWORD_EXPIRE_TIME = 5

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
			return notLogged(res)
		}
		req.body.sessionUserId = (<JwtPayload | undefined>decoded)?.id
		return next()
	}

	if(!token)
		return notLogged(res)

	jwt.verify(token as string, process.env.JWT_SECRET_KEY as string, verifyTokenCallback)
}

export const resetPasswordGenerateToken = (email: string) => {
	const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY_RESET_PASSWORD as string, {
		expiresIn: `${RESET_PASSWORD_EXPIRE_TIME} min`
	})
	return token
}

export const isResetPasswordTokenValid:RequestHandler = (req, res, next) => {
	const { token } = req.body
	const verifyTokenCallback = (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
		if(err) {
			return invalidToken(res)
		}
		req.body.email = (<JwtPayload | undefined>decoded)?.email
		return next()
	}

	if(!token)
		return invalidToken(res)

	jwt.verify(token as string, process.env.JWT_SECRET_KEY_RESET_PASSWORD as string, verifyTokenCallback)

}

export const isUserVerified:RequestHandler = async (req, res, next) => {
	const { sessionUserId } = req.body
	const userProperties = { accountType: 1 }
	const user = await getUserData(sessionUserId, res, userProperties) as IUserModel

	if([USER_TYPES.ORDERER, USER_TYPES.ADMIN].includes(user.accountType)) {
		next()
	} else {
		notVerified(res)
	}
}

export const isAdministrator:RequestHandler = async (req, res, next) => {
	const { sessionUserId } = req.body
	const userProperties = { accountType: 1 }
	const user = await getUserData(sessionUserId, res, userProperties) as IUserModel

	if(user.accountType === USER_TYPES.ADMIN) {
		next()
	} else {
		notAdministrator(res)
	}
}