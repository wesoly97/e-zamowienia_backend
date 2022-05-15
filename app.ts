import express from 'express'
import routes from './routes'

const app = express()

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`server is running at localhost:${PORT}`)
    routes(app)
})