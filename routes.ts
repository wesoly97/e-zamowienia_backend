import { Express } from 'express'
import { exampleResponse } from './controller/example.controller'

function routes(app: Express)
{
    app.get('/users', exampleResponse)
}

export default routes