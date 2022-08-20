import { Express } from 'express'
import redoc from 'redoc-express'
import multer from 'multer'
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from './controllers/oders/orders.controller'
import { checkLoginValidationResult, checkValidationResult } from './utils/checkValidationResult'
import { checkOrderId, orderUpdateValidator, orderValidator } from './controllers/oders/orders.validators'
import {
	createUser,
	deleteUser,
	emailIsValid,
	getUserData,
	getUsers,
	logIn,
	logOut,
	updateUser
} from './controllers/users/users.controller'
import {
	checkEmail,
	checkEmailExist, checkPassword,
	checkUserId,
	userUpdateValidator,
	userValidator
} from './controllers/users/users.validators'
import { getDocumentationFile } from './controllers/documentation/documentation.controller'
import { isUserLogged } from './middlewares/userAuthorization'
import { getFile } from './controllers/files/files.controller'

export const PATHS = {
	ORDERS: '/orders',
	DOCUMENTATION: '/documentation',
	USERS: '/users',
	FILES: '/files'
}

const upload = multer()

const routes = (app: Express) => {
	app.get(PATHS.DOCUMENTATION, redoc({ title: 'E-Zamówienia - Api dokumentacja', specUrl: `${PATHS.DOCUMENTATION}/file` }))
	app.get(`${PATHS.DOCUMENTATION}/file`, getDocumentationFile)

	app.get(`${PATHS.FILES}/:key`, getFile)

	app.post(PATHS.ORDERS, upload.array('files'), orderValidator, checkValidationResult, createOrder)
	app.get(PATHS.ORDERS, getOrders)
	app.get(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, getOrder)
	app.patch(`${PATHS.ORDERS}/:orderId`, checkOrderId, orderUpdateValidator, checkValidationResult, isUserLogged, updateOrder)
	app.delete(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, isUserLogged, deleteOrder)

	app.post(PATHS.USERS, checkEmail, checkPassword, userValidator, checkValidationResult, checkEmailExist, createUser)
	app.get(PATHS.USERS, isUserLogged, getUsers)
	app.patch(`${PATHS.USERS}/:userId`, checkUserId, userUpdateValidator, checkValidationResult, isUserLogged, checkEmailExist, updateUser)
	app.delete(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, isUserLogged, deleteUser)
	app.get(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, isUserLogged, getUserData)
	app.post(`${PATHS.USERS}/checkEmail`, checkEmail, checkValidationResult, checkEmailExist, emailIsValid)
	app.post(`${PATHS.USERS}/login`, checkEmail, checkPassword, checkLoginValidationResult, logIn)
	app.post(`${PATHS.USERS}/logout`, isUserLogged, logOut)
}

export default routes