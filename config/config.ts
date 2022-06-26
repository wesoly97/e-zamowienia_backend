import dotenv from 'dotenv'

dotenv.config()

const SERVER_PORT = Number(process.env.PORT) || 3000
const MONGO_USERNAME = process.env.MONGODB_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGODB_PASSWORD || ''
const MONGODB_PATH = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@e-zamowienia.h47d0.mongodb.net/e-zamowienia`

export const config = {
    mongo: {
        url: MONGODB_PATH
    },
    server: {
     port:  SERVER_PORT
    }
}