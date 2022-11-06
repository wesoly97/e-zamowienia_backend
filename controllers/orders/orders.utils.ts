import { Response } from 'express'
import { onError, onNotFound } from '../../utils/handleRequestStatus'
import { EditedOrder, Order } from '../../models/orders'
import mongoose from 'mongoose'

export const getOrderData = (orderId: string, res:Response, orderProperties: object) => Order.findById(orderId).select(orderProperties).then(order => {
	if(order) {
		return order
	} else {
		onNotFound(res)
	}
}).catch(error => onError(error, res))

export const getOrdersByOwner = (ownerId: string, res:Response) => Order.find(
	{ ownerId: new mongoose.Types.ObjectId(ownerId) })

export const getExpiredOrders = () => Order.find({ expirationDate: { $lt: new Date() } })

export const removeEditedOrder = (orderId: string) => EditedOrder.findByIdAndDelete(orderId)