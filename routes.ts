import { Express } from 'express'
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from './controllers/oders/orders.controller'
import { checkValidationResult } from "./utils/checkValidationResult"
import { checkOrderId, orderUpdateValidator, orderValidator } from "./controllers/oders/orders.validators"
import swaggerDocumentation from "./documentation/swagger.json"
import swaggerUi from 'swagger-ui-express'

const PATHS = {
    ORDERS: '/orders',
    DOCUMENTATION: '/documentation'
}

const routes = (app: Express) => {
    app.post(PATHS.ORDERS, orderValidator, checkValidationResult, createOrder)
    app.get(PATHS.ORDERS, getOrders)
    app.get(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, getOrder)
    app.patch(`${PATHS.ORDERS}/:orderId`, orderUpdateValidator, checkValidationResult, updateOrder)
    app.delete(`${PATHS.ORDERS}/:orderId`, checkOrderId, checkValidationResult, deleteOrder)
    app.use(PATHS.DOCUMENTATION, swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
}

export default routes