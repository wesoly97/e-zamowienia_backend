import { Response } from 'express'

export const onError = (error: object, res: Response) => res.status(500).json(error)
export const onNotFound = (res: Response) => res.status(404).json({ message: res.__('errors.notFound') })
export const onSuccess = (body: object, status: number, res: Response) => res.status(status).json(body)
export const fieldAlreadyExist = (key: string, res: Response) => res.status(409).json({ message: res.__(key) })
export const invalidLoginOrPassword = (res: Response) => res.status(401).json({ message: res.__('errors.invalidEmailOrPassword') })
export const invalidPassword = (res: Response) => res.status(401).json({ message: res.__('errors.invalidPassword') })
export const notLogged = (res: Response) => res.status(401).json({ message: res.__('errors.mustBeLogged') })
export const notVerified = (res: Response) => res.status(403).json({ message: res.__('errors.mustBeVerified') })
export const notAdministrator = (res: Response) => res.status(403).json({ message: res.__('errors.mustBeAdministrator') })
export const emailNotExist = (res: Response) => res.status(404).json({ message: res.__('errors.emailNotExist') })
export const invalidToken = (res: Response) => res.status(401).json({ message: res.__('errors.invalidToken') })
export const accessNotProvided = (res: Response) => res.status(403).json({ message: res.__('errors.accessNotProvided') })