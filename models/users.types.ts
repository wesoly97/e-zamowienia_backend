import { Document } from 'mongoose'

interface IUser {
	name: string,
	surname: string,
	accountType: string,
	mail: string,
	password: string,
	phoneNumber: string,
	dateOfCreation: Date,
}

export interface IUserModel extends IUser, Document {}