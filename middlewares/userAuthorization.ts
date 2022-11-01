import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { CookieOptions, RequestHandler, Response } from 'express'
import { accessNotProvided, invalidToken, notAdministrator, notLogged, notVerified } from '../utils/handleRequestStatus'
import { IUserModel } from '../models/users.types'
import { getUserData } from '../controllers/users/users.utils'
import { USER_TYPES } from '../controllers/users/users.consts'
import { getOrderData } from '../controllers/oders/orders.utils'
import { IOrderModel } from '../models/orders.types'

const NUMBER_OF_DAYS_COOKIE_EXPIRED = 2
const RESET_PASSWORD_EXPIRE_TIME = 5

const COOKIE_CONFIG: CookieOptions = {
	path: '/',
	expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * NUMBER_OF_DAYS_COOKIE_EXPIRED),
	httpOnly: true,
	sameSite: 'none',
	secure: true
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

	return encodeURIComponent(token.replaceAll(/\./g, '&#46;'))
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

	const originalToken = token.replaceAll('&#46;', '.')

	jwt.verify(originalToken as string, process.env.JWT_SECRET_KEY_RESET_PASSWORD as string, verifyTokenCallback)
}

export const isUserVerified:RequestHandler = async (req, res, next) => {
	const { sessionUserId } = req.body
	const userProperties = { accountType: 1 }
	const user = await getUserData(sessionUserId, res, userProperties) as IUserModel

	if([USER_TYPES.ORDERER, USER_TYPES.ADMIN].includes(user.accountType)) {
		req.body.userData = user
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

export const isAccountOwnerOrAdministrator:RequestHandler = async (req, res, next) => {
	const { sessionUserId } = req.body
	const userId = req.params.userId
	const userProperties = { accountType: 1 }
	const user = await getUserData(sessionUserId, res, userProperties) as IUserModel

	if(user.accountType === USER_TYPES.ADMIN || sessionUserId === userId) {
		next()
	} else {
		accessNotProvided(res)
	}
}

export const isOrderOwnerOrAdministrator:RequestHandler = async (req, res, next) => {
	const { sessionUserId } = req.body
	const orderId = req.params.orderId
	const userProperties = { accountType: 1 }
	const orderProperties = { ownerId: 1 }

	const user = await getUserData(sessionUserId, res, userProperties) as IUserModel
	const order = await getOrderData(orderId, res, orderProperties) as IOrderModel

	if(user.accountType === USER_TYPES.ADMIN || sessionUserId === order.ownerId) {
		next()
	} else {
		accessNotProvided(res)
	}
}