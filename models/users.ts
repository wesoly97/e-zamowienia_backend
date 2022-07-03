import mongoose, { Document, Schema } from 'mongoose'

const COLLECTION_NAME = 'Users'

export interface IUser {
    name: string,
    surname: string,
    accountType: string,
    mail: string,
    password: string,
    phoneNumber: string,
    dateOfCreation: Date,
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        accountType: { type: String, required: true },
        mail: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        dateOfCreation: { type: Date, required: true },
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUserModel>(COLLECTION_NAME, userSchema)