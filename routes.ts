import { Express } from 'express'
import {createOrder, getOrder, getOrders, updateOrder} from './controllers/oders/orders.controller'
import { checkValidationResult } from "./utils/checkValidationResult"
import { checkOderId, orderUpdateValidator, orderValidator } from "./controllers/oders/orders.validators"

const PATHS = {
    ORDERS: '/orders'
}

function routes(app: Express) {
    app.post(PATHS.ORDERS, orderValidator, checkValidationResult, createOrder)
    app.get(PATHS.ORDERS, getOrders)
    app.get(`${PATHS.ORDERS}/:orderId`, checkOderId, checkValidationResult, getOrder)
    app.patch(`${PATHS.ORDERS}/:orderId`, orderUpdateValidator, checkValidationResult, updateOrder)
}

export default routes