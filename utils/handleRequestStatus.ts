import { Response } from "express"
import { getTranslation } from "./getTranslation"

export const onError = (error: object, res: Response) => res.status(500).json(error)
export const onNotFound = (res: Response) => res.status(404).json({ message: getTranslation({ key: 'errors.notFound' })})
export const onSuccess = (body: object, status: number, res: Response) => res.status(status).json(body)