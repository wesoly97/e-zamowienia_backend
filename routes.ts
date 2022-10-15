import { Express } from 'express'
import redoc from 'redoc-express'
import multer from 'multer'
import {
	createEditedOrder,
	createOrder,
	deleteOrder,
	getEditedOrders,
	getOrder,
	getOrders, updateOrder
} from './controllers/oders/orders.controller'
import { checkLoginValidationResult, checkValidationResult } from './utils/checkValidationResult'
import { checkOrderId, orderUpdateValidator, orderValidator } from './controllers/oders/orders.validators'
import {
	changePassword,
	createUser, createVerifyRequest,
	deleteUser,
	emailIsValid,
	getSessionData,
	getUserData,
	getUsers, getUsersVerificationList,
	logIn,
	logOut,
	resetPassword,
	updateUser,
	verifyUser
} from './controllers/users/users.controller'
import {
	checkEmail,
	checkEmailExist,
	checkPassword,
	checkUserId,
	userUpdateValidator,
	userValidator,
	userVerificationValidator
} from './controllers/users/users.validators'
import { getDocumentationFile } from './controllers/documentation/documentation.controller'
import { isAdministrator, isResetPasswordTokenValid, isUserLogged, isUserVerified } from './middlewares/userAuthorization'
import { getFile } from './controllers/files/files.controller'
import { getStatistics } from './controllers/statistics/statistics.controller'

export const PATHS = {
	ORDERS: '/orders',
	DOCUMENTATION: '/documentation',
	USERS: '/users',
	FILES: '/files',
	STATISTICS: '/statistics',
}

const upload = multer()

const routes = (app: Express) => {
	app.get(PATHS.DOCUMENTATION, redoc({ title: 'E-Zamówienia - Api dokumentacja', specUrl: `${PATHS.DOCUMENTATION}/file` }))
	app.get(`${PATHS.DOCUMENTATION}/file`, getDocumentationFile)

	app.get(`${PATHS.FILES}/:key`, getFile)

	app.post(PATHS.ORDERS, upload.array('files'), orderValidator, checkValidationResult, isUserLogged, isUserVerified, createOrder)
	app.get(PATHS.ORDERS, getOrders)
	app.get(`${PATHS.ORDERS}/edited`, isUserLogged, isAdministrator, getEditedOrders)
	app.get(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, getOrder)
	app.patch(`${PATHS.ORDERS}/:orderId`, checkOrderId, orderUpdateValidator, checkValidationResult, isUserLogged, createEditedOrder)
	app.post(`${PATHS.ORDERS}/:orderId/accept`, checkOrderId, checkValidationResult, isUserLogged, isAdministrator, updateOrder)
	app.delete(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, isUserLogged, isAdministrator, deleteOrder)

	app.post(PATHS.USERS, checkEmail, checkPassword, userValidator, checkValidationResult, checkEmailExist, createUser)
	app.get(PATHS.USERS, isUserLogged, getUsers)
	app.patch(`${PATHS.USERS}/:userId`, checkUserId, userUpdateValidator, checkValidationResult, isUserLogged, checkEmailExist, updateUser)
	app.delete(`${PATHS.USERS}/password`, checkEmail, checkValidationResult, resetPassword)
	app.post(`${PATHS.USERS}/password`, checkPassword, checkValidationResult, isResetPasswordTokenValid, changePassword)
	app.delete(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, isUserLogged, deleteUser)
	app.get(`${PATHS.USERS}/session`, isUserLogged, getSessionData)
	app.get(`${PATHS.USERS}/verify`, isUserLogged, isAdministrator, getUsersVerificationList)
	app.get(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, isUserLogged, getUserData)
	app.post(`${PATHS.USERS}/checkEmail`, checkEmail, checkValidationResult, checkEmailExist, emailIsValid)
	app.post(`${PATHS.USERS}/login`, checkEmail, checkPassword, checkLoginValidationResult, logIn)
	app.post(`${PATHS.USERS}/logout`, isUserLogged, logOut)
	app.post(`${PATHS.USERS}/:userId/verify`, checkUserId, checkValidationResult, isUserLogged, isAdministrator, verifyUser)
	app.post(`${PATHS.USERS}/verify`, userVerificationValidator, checkValidationResult, isUserLogged, createVerifyRequest)

	app.get(`${PATHS.STATISTICS}`, getStatistics)
}

export default routes