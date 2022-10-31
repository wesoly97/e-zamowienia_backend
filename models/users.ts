import mongoose, { Schema } from 'mongoose'
import { IUserModel } from './users.types'

const COLLECTION_NAME = 'Users'

const userSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		surname: { type: String, required: true },
		accountType: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		dateOfCreation: { type: Date, required: true },
		country: { type: String, required: true },
		nip: { type: String, required: true },
		companyName: { type: String, required: true },
	},
	{
		versionKey: false
	}
)

mongoose.Schema.Types.String.checkRequired(v => v != null) // this line allows empty strings in database

export default mongoose.model<IUserModel>(COLLECTION_NAME, userSchema)