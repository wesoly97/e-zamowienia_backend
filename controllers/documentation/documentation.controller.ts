import { RequestHandler } from "express"

export const getDocumentationFile:RequestHandler = (req, res) => res.sendFile('./controllers/documentation/swagger.json', { root: '.' })
