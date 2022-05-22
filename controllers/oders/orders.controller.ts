import { Request, Response } from "express"
import Order from '../../models/orders'
import mongoose from "mongoose"

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
        .then( author => res.status(201).json({ order }))
        .catch(error => res.status(500).json({ error }))
}

export const getOrders = (req: Request, res: Response) => Order.find().then(
    orders => res.status(200).json({ orders }))
    .catch(error => res.status(500).json({ error }))