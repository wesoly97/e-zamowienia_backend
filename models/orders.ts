import mongoose, { Document, Schema } from 'mongoose'

const COLLECTION_NAME = 'Orders'

export interface IOrder {
    procedureIdentifier: string,
    category: string,
    mode: string,
    title: string,
    customerName: string,
    description: string,
    files: string[],
    dateOfPublication: Date,
    expirationDate: Date,
}

export interface IOrderModel extends IOrder, Document {}

const orderSchema: Schema = new Schema(
    {
        procedureIdentifier: { type: String, required: true },
        category: { type: String, required: true },
        mode: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        customerName: { type: String, required: true },
        files: { type: Array, required: true },
        dateOfPublication: { type: Date, required: true },
        expirationDate: { type: Date, required: true }
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IOrderModel>(COLLECTION_NAME, orderSchema)