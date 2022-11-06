import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from '../routes'

export const app = express()

app.use(cors( { credentials: true, origin: ['http://127.0.0.1:8080','http://localhost:8080','https://e-zamowienia.onrender.com'] }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
routes(app)

