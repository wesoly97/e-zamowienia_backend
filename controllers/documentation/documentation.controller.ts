import { Request, Response } from "express"

export const getDocumentationFile = (req: Request, res: Response) => res.sendFile('./controllers/documentation/swagger.json', { root: '.' })
