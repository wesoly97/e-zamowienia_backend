import mongoose, { Schema } from 'mongoose'
import { IUserVerificationModel } from './userVerification.types'

const COLLECTION_NAME = 'User_Verifications'

const userVerificationSchema: Schema = new Schema(
	{
		phoneNumber: { type: String, required: true },
		country: { type: String, required: true },
		nip: { type: String, required: true },
		companyName: { type: String, required: true },
	},
	{
		versionKey: false
	}
)

export default mongoose.model<IUserVerificationModel>(COLLECTION_NAME, userVerificationSchema)