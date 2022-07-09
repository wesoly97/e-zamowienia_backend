import { Express } from 'express'
import redoc from 'redoc-express'
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from './controllers/oders/orders.controller'
import { checkValidationResult } from "./utils/checkValidationResult"
import { checkOrderId, orderUpdateValidator, orderValidator } from "./controllers/oders/orders.validators"
import {
    createUser,
    deleteUser,
    emailIsValid,
    getUserData,
    getUsers,
    logIn,
    updateUser
} from "./controllers/users/users.controller"
import {
    checkEmail,
    checkEmailExist,
    checkUserId,
    userUpdateValidator,
    userValidator
} from "./controllers/users/users.validators"
import { getDocumentationFile } from "./controllers/documentation/documentation.controller"

const PATHS = {
    ORDERS: '/orders',
    DOCUMENTATION: '/documentation',
    USERS: '/users'
}

const routes = (app: Express) => {
    app.get(PATHS.DOCUMENTATION, redoc({ title: 'E-Zamówienia - Api dokumentacja', specUrl: `${PATHS.DOCUMENTATION}/file` }))
    app.get(`${PATHS.DOCUMENTATION}/file`, getDocumentationFile)

    app.post(PATHS.ORDERS, orderValidator, checkValidationResult, createOrder)
    app.get(PATHS.ORDERS, getOrders)
    app.get(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, getOrder)
    app.patch(`${PATHS.ORDERS}/:orderId`, checkOrderId, orderUpdateValidator, checkValidationResult, updateOrder)
    app.delete(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, deleteOrder)

    app.post(PATHS.USERS, checkEmail, userValidator, checkValidationResult, checkEmailExist, createUser)
    app.get(PATHS.USERS, getUsers)
    app.patch(`${PATHS.USERS}/:userId`, checkUserId, userUpdateValidator, checkValidationResult, checkEmailExist, updateUser)
    app.delete(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, deleteUser)
    app.get(`${PATHS.USERS}/:userId`, checkUserId, checkValidationResult, getUserData)
    app.post(`${PATHS.USERS}/checkEmail`, checkEmail, checkValidationResult, checkEmailExist, emailIsValid)
    app.post(`${PATHS.USERS}/login`,logIn)
}

export default routes