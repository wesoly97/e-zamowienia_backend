import { RequestHandler } from 'express'
import { EditedOrder, Order } from '../../models/orders'
import mongoose from 'mongoose'
import { getTranslation } from '../../utils/getTranslation'
import { onError, onNotFound, onSuccess } from '../../utils/handleRequestStatus'
import { deleteFiles, fileUpload } from '../../middlewares/amazonS3'
import { PATHS } from '../../routes'
import { getServerDomain } from '../../utils/getServerDomain'

export const createOrder:RequestHandler = async (req, res) => {
	const { procedureIdentifier, category, mode, title, expirationDate, description, customerName, price, sessionUserId } = req.body
	const files = req.files as Express.Multer.File[] || []
	const filesArray: object[] = []

	const promises = files.map((file: Express.Multer.File) => fileUpload(file).then(
		fileKey => filesArray.push(
			{
				url: `${getServerDomain()}${PATHS.FILES}/${fileKey}`,
				fileName: file.originalname,
				key: fileKey
			}
		)))

	await Promise.all(promises)

	const order = new Order({
		_id: new mongoose.Types.ObjectId(),
		title,
		mode,
		category,
		dateOfPublication: new Date(),
		description,
		files: filesArray,
		price,
		customerName,
		expirationDate,
		procedureIdentifier,
		ownerId: sessionUserId,
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
	ownerId: 1,
})
	.then(orders => onSuccess(orders,200, res))
	.catch(error => onError(error, res))

export const getOrder:RequestHandler = (req, res) => {
	const orderId = req.params.orderId
	return Order.findById(orderId).then(
		order => order ? onSuccess(order,200, res) : onNotFound(res)
	).catch(error => onError(error, res))
}

export const createEditedOrder:RequestHandler = (req, res) => {
	const orderId = req.params.orderId
	Order.findById(orderId).then(order => {
		if (order) {
			order.set(req.body)
			const editedOrder = new EditedOrder({
				_id: order._id,
				title: order.title,
				mode: order.mode,
				category: order.category,
				dateOfPublication: order.dateOfPublication,
				description: order.description,
				files: order.files,
				price: order.price,
				customerName: order.customerName,
				expirationDate: order.expirationDate,
				procedureIdentifier: order.procedureIdentifier,
				ownerId: order.ownerId,
			})

			return editedOrder.save().then(editedOrder => onSuccess(editedOrder,200, res)).catch(error => onError(error, res))
		}
		else
			onNotFound(res)
	})
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
	Order.findById(orderId).then(order => {
		if(order) {
			const filesToDelete: object[] = []
			order.files.map(file => filesToDelete.push({ Key: file.key }))
			deleteFiles(filesToDelete).then(() => order?.delete().then(
				onSuccess({ message: getTranslation({ key: 'orders.deleteConfirmation' }) },200, res)
			)).catch(error => onError(error, res))
		}
		else
			onNotFound(res)
	}).catch(error => onError(error, res))
}