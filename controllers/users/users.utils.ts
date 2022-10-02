import { Response } from 'express'
import User from '../../models/users'
import { onError, onNotFound } from '../../utils/handleRequestStatus'

export const getUserData = (sessionUserId: string, res:Response, userProperties: object) => User.findById(sessionUserId).select(userProperties).then(user => {
	if(user) {
		return user
	} else {
		onNotFound(res)
	}
}).catch(error => onError(error, res))