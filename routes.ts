import { Express } from 'express'
import { getUsers } from './controllers/user.controller'

function routes(app: Express) {
    app.get('/users', getUsers)
}

export default routes