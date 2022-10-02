import { RequestHandler } from 'express'
import Order from '../../models/orders'
import { onError } from '../../utils/handleRequestStatus'
import User from '../../models/users'
import { IUserModel } from '../../models/users.types'

export const getStatistics:RequestHandler = async (req, res) => {
	const ordersNumber = await Order.find().select({ _id: 1 }).count().catch(error => onError(error, res))
	const users = await User.find().select({ isVerified: 1 }).catch(error => onError(error, res))
	const orderersNumber = (users as Array<IUserModel>).filter(user => user.isVerified).length
	const contractorsNumber = (users as Array<IUserModel>).length - orderersNumber

	return res.status(200).json({ ordersNumber, orderersNumber, contractorsNumber })
}
