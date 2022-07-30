import { RequestHandler } from 'express'
import Order from '../../models/orders'
import mongoose from 'mongoose'
import { getTranslation } from '../../utils/getTranslation'
import { onError, onNotFound, onSuccess } from '../../utils/handleRequestStatus'

export const createOrder:RequestHandler = (req, res) => {
	const { procedureIdentifier, category, mode, title, expirationDate, description, files, customerName, price } = req.body

	const order = new Order({
		_id: new mongoose.Types.ObjectId(),
		title,
		mode,
		category,
		dateOfPublication: new Date(),
		description,
		files: [],
		price,
		customerName,
		expirationDate,
		procedureIdentifier,
	})
	return order.save().then(order => onSuccess(order,201, res)).catch(error => onError(error, res))
}

export const getOrders:RequestHandler = (req, res) => Order.find().select({
	_id: 1,
	title: 1,
	mode: 1,
	category: 1,
	dateOfPublication: 1 ,
	procedureIdentifier: 1,
	expirationDate: 1,
	price: 1,
})
	.then(orders => onSuccess(orders,200, res))
	.catch(error => onError(error, res))

export const getOrder:RequestHandler = (req, res) => {
	const orderId = req.params.orderId
	return Order.findById(orderId).then(
		order => order ? onSuccess(order,200, res) : onNotFound(res)
	).catch(error => onError(error, res))
}

export const updateOrder:RequestHandler = (req, res) => {
	const orderId = req.params.orderId
	return Order.findById(orderId).then(order => {
		if (order) {
			order.set(req.body)
			return order.save().then(order => onSuccess(order,200, res)).catch(error => onError(error, res))
		}
		else
			onNotFound(res)
	})
}

export const deleteOrder:RequestHandler = (req, res) => {
	const orderId = req.params.orderId
	return Order.findByIdAndDelete(orderId).then(order => order ?
		onSuccess({ message: getTranslation({ key: 'orders.deleteConfirmation' }) },200, res)
		: onNotFound(res)).catch(error => onError(error, res))
}