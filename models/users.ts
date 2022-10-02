import mongoose, { Schema } from 'mongoose'
import { IUserModel } from './users.types'

const COLLECTION_NAME = 'Users'

const userSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		surname: { type: String, required: true },
		accountType: { type: String, required: true },
		mail: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		dateOfCreation: { type: Date, required: true },
		isVerified: { type: Boolean, required: true },
	},
	{
		versionKey: false
	}
)

export default mongoose.model<IUserModel>(COLLECTION_NAME, userSchema)