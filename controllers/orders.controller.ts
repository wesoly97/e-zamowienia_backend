import { Request, Response } from "express"
import Order from '../models/orders'
import mongoose, {Schema} from "mongoose"

export const createOrder = (req: Request, res: Response) => {
    const { procedureIdentifier, category, mode, title, expirationDate } = req.body
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        title,
        mode,
        category,
        dateOfPublication: new Date(),
        expirationDate,
        procedureIdentifier,
    })
    return order.save()
        .then( author => res.status(201).json({ order }))
        .catch(error => res.status(500).json({ error }))
}

