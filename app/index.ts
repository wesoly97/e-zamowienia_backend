import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from '../routes'
import i18n from '../config/i18n'
export const app = express()

app.use(cors( { credentials: true, origin: ['http://127.0.0.1:8080','http://localhost:8080','https://e-zamowienia.onrender.com'] }))
app.use(cookieParser())
app.use(i18n.init)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
routes(app)

