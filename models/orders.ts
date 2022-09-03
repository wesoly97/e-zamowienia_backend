import mongoose, { Schema } from 'mongoose'
import { IOrderModel } from './orders.types'

const COLLECTION_NAME = 'Orders'

const orderSchema: Schema = new Schema(
	{
		procedureIdentifier: { type: String, required: true },
		category: { type: String, required: true },
		mode: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		customerName: { type: String, required: true },
		price:{ type: Number, required: true },
		files: { type: Array, required: true },
		dateOfPublication: { type: Date, required: true },
		expirationDate: { type: Date, required: true },
		ownerId:{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	},
	{
		versionKey: false
	}
)

export default mongoose.model<IOrderModel>(COLLECTION_NAME, orderSchema)