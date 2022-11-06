import { Express } from 'express'
import redoc from 'redoc-express'
import multer from 'multer'
import {
	createEditedOrder,
	createOrder,
	deleteOrder,
	denyEditOrder,
	getEditedOrders,
	getOrder,
	getOrders, updateOrder
} from './controllers/orders/orders.controller'
import { checkLoginValidationResult, checkValidationResult } from './utils/checkValidationResult'
import {
	checkOrderId,
	getOrdersValidator,
	orderUpdateValidator,
	orderValidator
} from './controllers/orders/orders.validators'
import {
	resetPassword,
	createUser,
	createVerifyRequest,
	deleteUser,
	denyVerifyUser,
	emailIsValid,
	getSessionData,
	getUserData,
	getUsers,
	getUsersVerificationList,
	logIn,
	logOut,
	recoverPassword,
	updateUser,
	verifyUser,
	changePassword
} from './controllers/users/users.controller'
import {
	checkEmail,
	checkEmailExist, checkOldPassword,
	checkPassword,
	checkRepeatPassword,
	checkUserId,
	userUpdateValidator,
	userValidator,
	userVerificationValidator
} from './controllers/users/users.validators'
import { getDocumentationFile } from './controllers/documentation/documentation.controller'
import {
	isAccountOwnerOrAdministrator,
	isAdministrator,
	isOrderOwnerOrAdministrator,
	isResetPasswordTokenValid,
	isUserLogged,
	isUserVerified
} from './middlewares/userAuthorization'
import { getFile } from './controllers/files/files.controller'
import { getStatistics } from './controllers/statistics/statistics.controller'
import { getSettings } from './controllers/settings/settings.controller'

export const PATHS = {
	ORDERS: '/orders',
	DOCUMENTATION: '/documentation',
	USERS: '/users',
	FILES: '/files',
	STATISTICS: '/statistics',
	SETTINGS: '/settings',
}

const upload = multer()

const routes = (app: Express) => {
	app.get(PATHS.DOCUMENTATION, redoc({ title: 'E-Zamówienia - Api dokumentacja', specUrl: `${PATHS.DOCUMENTATION}/file` }))
	app.get(`${PATHS.DOCUMENTATION}/file`, getDocumentationFile)

	app.get(`${PATHS.FILES}/:key`, getFile)

	app.post(PATHS.ORDERS, upload.array('files'), orderValidator, checkValidationResult, isUserLogged, isUserVerified, createOrder)
	app.get(PATHS.ORDERS, getOrdersValidator, checkValidationResult, getOrders)
	app.get(`${PATHS.ORDERS}/edited`, isUserLogged, isAdministrator, getEditedOrders)
	app.get(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, getOrder)
	app.patch(`${PATHS.ORDERS}/:orderId`, upload.array('files'), checkOrderId, orderUpdateValidator, checkValidationResult, isUserLogged, isOrderOwnerOrAdministrator, createEditedOrder)
	app.post(`${PATHS.ORDERS}/:orderId/accept`, checkOrderId, checkValidationResult, isUserLogged, isAdministrator, updateOrder)
	app.post(`${PATHS.ORDERS}/:orderId/deny`, checkOrderId, checkValidationResult, isUserLogged, isAdministrator, denyEditOrder)
	app.delete(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, isUserLogged, isAdministrator, deleteOrder)

	app.post(PATHS.USERS, checkEmail, checkPassword, checkRepeatPassword, userValidator, checkValidationResult, checkEmailExist, createUser)
	app.get(PATHS.USERS, isUserLogged, getUsers)
	app.patch(`${PATHS.USERS}/password`, checkPassword, checkRepeatPassword, checkOldPassword, checkValidationResult, isUserLogged, changePassword)
	app.patch(`${PATHS.USERS}/:userId`, checkUserId, userUpdateValidator, checkValidationResult, isUserLogged, isAccountOwnerOrAdministrator, updateUser)
	app.delete(`${PATHS.USERS}/password`, checkEmail, checkValidationResult, recoverPassword)
	app.post(`${PATHS.USERS}/password`, checkPassword, checkRepeatPassword, checkValidationResult, isResetPasswordTokenValid, resetPassword)
	app.delete(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, isUserLogged, deleteUser)
	app.get(`${PATHS.USERS}/session`, isUserLogged, getSessionData)
	app.get(`${PATHS.USERS}/verify`, isUserLogged, isAdministrator, getUsersVerificationList)
	app.get(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, isUserLogged, isAccountOwnerOrAdministrator, getUserData)
	app.post(`${PATHS.USERS}/checkEmail`, checkEmail, checkValidationResult, checkEmailExist, emailIsValid)
	app.post(`${PATHS.USERS}/login`, checkEmail, checkPassword, checkLoginValidationResult, logIn)
	app.post(`${PATHS.USERS}/logout`, isUserLogged, logOut)
	app.post(`${PATHS.USERS}/:userId/verify`, checkUserId, checkValidationResult, isUserLogged, isAdministrator, verifyUser)
	app.post(`${PATHS.USERS}/:userId/deny`, checkUserId, checkValidationResult, isUserLogged, isAdministrator, denyVerifyUser)
	app.post(`${PATHS.USERS}/verify`, userVerificationValidator, checkValidationResult, isUserLogged, createVerifyRequest)

	app.get(`${PATHS.STATISTICS}`, getStatistics)
	app.get(`${PATHS.SETTINGS}`, getSettings)

}

export default routes