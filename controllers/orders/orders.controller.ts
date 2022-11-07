import { RequestHandler } from 'express'
import { EditedOrder, Order } from '../../models/orders'
import mongoose from 'mongoose'
import { getTranslation } from '../../utils/getTranslation'
import { onError, onNotFound, onSuccess } from '../../utils/handleRequestStatus'
import { deleteFiles, fileUpload } from '../../middlewares/amazonS3'
import { PATHS } from '../../routes'
import { getServerDomain } from '../../utils/getServerDomain'
import { getFilteredText } from '../../utils/getFilters'
import User from '../../models/users'
import { IOrderModel } from '../../models/orders.types'
import { removeEditedOrder } from './orders.utils'

const orderPropertiesToGet = {
	_id: 1,
	title: 1,
	mode: 1,
	category: 1,
	dateOfPublication: 1 ,
	procedureIdentifier: 1,
	expirationDate: 1,
	price: 1,
	ownerId: 1,
}

export const createOrder:RequestHandler = async (req, res) => {
	const { procedureIdentifier, category, mode, title, expirationDate, description, price, userData } = req.body
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
		customerName: userData.companyName,
		expirationDate,
		procedureIdentifier,
		ownerId: userData._id,
	})
	return order.save().then(order => onSuccess(order,201, res)).catch(error => onError(error, res))
}

export const getOrders:RequestHandler = async (req, res) => {
	const offset:number = Number(req.query.offset) || 0
	const limit:number = Number(req.query.limit) || 10
	const filterOption = req.query.filterOption as filterOption
	const sortOption = req.query.sortOption
	const title = filterOption?.title || ''
	const mode = filterOption?.mode || ''
	const category = filterOption?.category || ''
	const ownerId = filterOption?.ownerId

	const filter = {
		title: getFilteredText(title),
		mode: getFilteredText(mode),
		category: getFilteredText(category),
		...(ownerId && { ownerId: new mongoose.Types.ObjectId(ownerId) })
	}

	const count = await Order.find().countDocuments().catch(error => onError(error, res))
	const orders = await Order.find(filter).select(orderPropertiesToGet).limit(limit).skip(offset * limit)
		.sort(sortOption).catch(error => onError(error, res))

	return onSuccess({ orders, count },200, res)
}

export const getEditedOrders:RequestHandler = (req, res) => EditedOrder.find().select(orderPropertiesToGet)
	.then(orders => onSuccess(orders,200, res))
	.catch(error => onError(error, res))

export const getOrder:RequestHandler = async (req, res) => {
	const orderId = req.params.orderId
	const order = await Order.findById(orderId).catch(error => onError(error, res)) as IOrderModel
	const userData = await User.findById(order?.ownerId)

	if(order) {
		const orderDetails = {
			...order.toObject(),
			phoneNumber: userData?.phoneNumber || '',
			email: userData?.email || '',
			country: userData?.country || '',
			customerName: userData?.companyName || '',
		}

		onSuccess(orderDetails,200, res)
	}
	else {
		onNotFound(res)
	}
}

export const createEditedOrder:RequestHandler = async (req, res) => {
	const orderId = req.params.orderId
	const order = await Order.findById(orderId)
	const editedOrder = await EditedOrder.findById(orderId)

	if (order) {
		order.set(req.body)
		const updatedOrder = {
			_id: order?._id,
			title: order?.title,
			mode: order?.mode,
			category: order?.category,
			dateOfPublication: order?.dateOfPublication,
			description: order?.description,
			files: order?.files,
			price: order?.price,
			customerName: order?.customerName,
			expirationDate: order?.expirationDate,
			procedureIdentifier: order?.procedureIdentifier,
			ownerId: order?.ownerId,
		}
		if(!editedOrder) {
			const modifiedOrder = new EditedOrder(updatedOrder)
			return modifiedOrder.save().then(modifiedOrder => onSuccess(modifiedOrder,200, res)).catch(error => onError(error, res))
		} else {
			editedOrder.set(updatedOrder)
			return editedOrder.save().then(editedOrder => onSuccess(editedOrder,200, res)).catch(error => onError(error, res))
		}
	}
	else {
		onNotFound(res)
	}
}

export const updateOrder:RequestHandler = async (req, res) => {
	const orderId = req.params.orderId
	const order = await Order.findById(orderId)
	const editedOrder = await EditedOrder.findById(orderId)

	if (editedOrder && order) {
		order.set(editedOrder)
		editedOrder.delete()
		return order.save().then(order => onSuccess(order,200, res)).catch(error => onError(error, res))
	} else {
		onNotFound(res)
	}
}

export const denyEditOrder:RequestHandler = async (req, res) => {
	const orderId = req.params.orderId
	return EditedOrder.findByIdAndDelete(orderId).then(user => user ?
		onSuccess({ message: getTranslation({ key: 'orders.denyEditOrderConfirmation' }) },200, res)
		: onNotFound(res)).catch(error => onError(error, res))
}

export const deleteOrder:RequestHandler = (req, res) => {
	const orderId = req.params.orderId
	Order.findById(orderId).then(order => {
		if(order) {
			const filesToDelete: object[] = []
			order.files.map(file => filesToDelete.push({ Key: file.key }))
			removeEditedOrder(order._id)
			deleteFiles(filesToDelete).then(() => order?.delete().then(
				onSuccess({ message: getTranslation({ key: 'orders.deleteConfirmation' }) },200, res)
			)).catch(error => onError(error, res))
		}
		else
			onNotFound(res)
	}).catch(error => onError(error, res))
}