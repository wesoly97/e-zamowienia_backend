import express from 'express'
import routes from './routes'

const app = express()

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
    routes(app)
})