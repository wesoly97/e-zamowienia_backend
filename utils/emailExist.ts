import Users from '../models/users'
import { onError } from './handleRequestStatus'
import { Response } from 'express'

export const emailExist = (mail: string, res:Response) => Users.findOne({ mail }).then(user => !!user).catch(
	error => onError(error, res)
)
