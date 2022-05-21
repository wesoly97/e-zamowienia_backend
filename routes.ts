import { Express } from 'express'
import { getUsers } from './controllers/user.controller'
import { createOrder } from './controllers/orders.controller'

function routes(app: Express) {
    app.get('/users', getUsers)
    app.post('/orders', createOrder)
}

export default routes