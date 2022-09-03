import express from 'express'
import routes from './routes'
import { config } from './config/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { getServerDomain } from './utils/getServerDomain'
import cors from 'cors'

const app = express()

const onSuccessConnect = () => console.log('Conected to database')
const onErrorConnect = (error: object) => console.log(error)

mongoose.connect(config.mongo.url,{ retryWrites: true, w: 'majority' }).then(onSuccessConnect).catch(onErrorConnect)

app.listen(config.server.port, () => {
	console.log(`server is running at ${getServerDomain()}/documentation`)
	app.use(cors())
	app.use(cookieParser())
	app.use(express.urlencoded({ extended: false }))
	app.use(express.json())
	routes(app)
})