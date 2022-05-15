import express from 'express'
import routes from './routes'
import { config } from "./config/config"
import mongoose from 'mongoose'

const app = express()

const onSuccessConnect = () => console.log('Conected to database')

const onErrorConnect = (error: object) => console.log(error)

mongoose.connect(config.mongo.url,{ retryWrites: true, w: 'majority' }).then(onSuccessConnect).catch(onErrorConnect)

app.listen(3000, () => {
    console.log(`server is running at localhost:${3000}`)
    routes(app)
})