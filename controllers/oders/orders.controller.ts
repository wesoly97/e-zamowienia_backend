import { Request, Response } from "express"
import Order from '../../models/orders'
import mongoose from "mongoose"
import { getTranslation } from "../../utils/getTranslation"

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
    return order.save()
        .then(order => res.status(201).json({ order }))
        .catch(error => res.status(500).json({ error }))
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
    .then(orders => res.status(200).json({ orders }))
    .catch(error => res.status(500).json({ error }))

export const getOrder = (req: Request, res: Response) => {
    const orderId = req.params.orderId
    return Order.findById(orderId).then(
        order => order ? res.status(200).json({ order }) : res.status(400).json({
            message:  getTranslation({ key: 'errors.notFound' })
        })
    ).catch(error => res.status(500).json({ error }))
}

export const updateOrder = (req: Request, res: Response) => {
    const orderId = req.params.orderId
    return Order.findById(orderId).then(order => {
        if (order) {
            order.set(req.body)
            return order.save().then(order => res.status(201).json({ order }))
                .catch(error => res.status(500).json({ error }))
        }
        else
            res.status(404).json({ message:  getTranslation({ key: 'errors.notFound' }) })
    })
}