import { Request, Response } from "express"
import  i18n from '../middlewares/i18n.config'
import { getTranslation } from "../utils/getTranslation"

export const getUsers = (req: Request, res: Response) => {
    i18n.setLocale('pl')
    return res.send(getTranslation('user'))
}