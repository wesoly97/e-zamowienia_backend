import { Express } from 'express'
import { createOrder, getOrders } from './controllers/oders/orders.controller'
import { checkValidationResult } from "./utils/checkValidationResult"
import { orderValidator } from "./controllers/oders/orders.validators"

const PATHS = {
    ORDERS: '/orders'
}

function routes(app: Express) {
    app.post(PATHS.ORDERS, orderValidator, checkValidationResult, createOrder)
    app.get(PATHS.ORDERS, getOrders)
}

export default routes