import express from 'express'
import routes from './routes'

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`)
    routes(app)
})