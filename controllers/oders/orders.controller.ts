import { Request, Response } from "express"
import Order from '../../models/orders'
import mongoose from "mongoose"
import { getTranslation } from "../../utils/getTranslation"

const onError = (error: object, res: Response) => res.status(500).json({ error })
const onNotFound = (res: Response) => res.status(404).json({ message: getTranslation({ key: 'errors.notFound' })})
const onSuccess = (body: object, status: number, res: Response) => res.status(status).json(body)

export const createOrder = (req: Request, res: Response) => {
    const { procedureIdentifier, category, mode, title, expirationDate, description, files, customerName } = req.body

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        title,
        mode,
        category,
        dateOfPublication: new Date(),
        description,
        files: [],
        customerName,
        expirationDate,
        procedureIdentifier,
    })
    return order.save().then(order => onSuccess(order,201, res)).catch(error => onError(error, res))
}

export const getOrders = (req: Request, res: Response) => Order.find().select({
    _id: 1,
    title: 1,
    mode: 1,
    category: 1,
    dateOfPublication: 1 ,
    procedureIdentifier: 1,
    expirationDate: 1,
    })
    .then(orders => onSuccess(orders,200, res))
    .catch(error => onError(error, res))

export const getOrder = (req: Request, res: Response) => {
    const orderId = req.params.orderId
    return Order.findById(orderId).then(
        order => order ? onSuccess(order,200, res) : onNotFound(res)
    ).catch(error => onError(error, res))
}

export const updateOrder = (req: Request, res: Response) => {
    const orderId = req.params.orderId
    return Order.findById(orderId).then(order => {
        if (order) {
            order.set(req.body)
            return order.save().then(order => onSuccess(order,201, res)).catch(error => onError(error, res))
        }
        else
            onNotFound(res)
    })
}

export const deleteOrder = (req: Request, res: Response) => {
    const orderId = req.params.orderId
    return Order.findByIdAndDelete(orderId).then(order => order ?
        onSuccess({ message: getTranslation({ key: 'orders.deleteConfirmation' })},201, res)
        : onNotFound(res)).catch(error => onError(error, res))
}