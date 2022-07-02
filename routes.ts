import { Express } from 'express'
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from './controllers/oders/orders.controller'
import { checkValidationResult } from "./utils/checkValidationResult"
import { checkOrderId, orderUpdateValidator, orderValidator } from "./controllers/oders/orders.validators"
import swaggerDocumentation from "./documentation/swagger.json"
import swaggerUi from 'swagger-ui-express'
import { createUser, updateUser } from "./controllers/users/users.controller"
import { checkEmailExist, userUpdateValidator, userValidator } from "./controllers/users/users.validators"

const PATHS = {
    ORDERS: '/orders',
    DOCUMENTATION: '/documentation',
    USERS: '/users'
}

const routes = (app: Express) => {
    app.post(PATHS.ORDERS, orderValidator, checkValidationResult, createOrder)
    app.get(PATHS.ORDERS, getOrders)
    app.get(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, getOrder)
    app.patch(`${PATHS.ORDERS}/:orderId`, orderUpdateValidator, checkValidationResult, updateOrder)
    app.delete(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, deleteOrder)
    app.use(PATHS.DOCUMENTATION, swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))

    app.post(PATHS.USERS, userValidator, checkValidationResult, checkEmailExist, createUser)
    app.patch(`${PATHS.USERS}/:userId`, userUpdateValidator, checkValidationResult, checkEmailExist, updateUser)
}

export default routes