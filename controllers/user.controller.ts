import { Request, Response } from "express"
import { getTranslation } from "../utils/getTranslation"

export const getUsers = (req: Request, res: Response) => res.status(200).json({title: getTranslation('user')})
