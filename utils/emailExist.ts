import Users from '../models/users'
import { onError } from './handleRequestStatus'
import { Response } from 'express'

export const emailExist = (email: string, res:Response) => Users.findOne({ email }).then(user => !!user).catch(
	error => onError(error, res)
)
