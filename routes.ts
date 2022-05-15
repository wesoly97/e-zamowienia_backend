import { Express } from 'express'
import { getUsers } from './controller/user.controller'

function routes(app: Express) {
    app.get('/users', getUsers)
}

export default routes