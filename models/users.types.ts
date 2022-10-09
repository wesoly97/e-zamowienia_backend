import { Document } from 'mongoose'

interface IUser {
	name: string,
	surname: string,
	accountType: string,
	email: string,
	password: string,
	phoneNumber: string,
	dateOfCreation: Date,
	country: string,
	nip: string,
	companyName: string,
}

export interface IUserModel extends IUser, Document {}