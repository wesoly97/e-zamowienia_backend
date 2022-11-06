import mongoose from 'mongoose'
import { config } from '../config'

const onSuccessConnect = () => console.log('Conected to database')
const onErrorConnect = (error: object) => console.log(error)

export const databaseInit = () => mongoose.connect(config.mongo.url,{ retryWrites: true, w: 'majority' })
	.then(onSuccessConnect).catch(onErrorConnect)
