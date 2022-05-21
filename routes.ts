import { Express } from 'express'
import { createOrder } from './controllers/oders/orders.controller'
import { checkValidationResult } from "./utils/checkValidationResult"
import { orderValidator } from "./controllers/oders/orders.validators"

function routes(app: Express) {
    app.post('/orders', orderValidator, checkValidationResult, createOrder)
}

export default routes