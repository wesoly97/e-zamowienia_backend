import { Response } from 'express'
import { onError, onNotFound } from '../../utils/handleRequestStatus'
import { Order } from '../../models/orders'

export const getOrderData = (orderId: string, res:Response, orderProperties: object) => Order.findById(orderId).select(orderProperties).then(order => {
	if(order) {
		return order
	} else {
		onNotFound(res)
	}
}).catch(error => onError(error, res))

export const getExpiredOrders = () => Order.find({ expirationDate: { $lt: new Date() } })

