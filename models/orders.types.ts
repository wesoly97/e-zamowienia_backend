import { Document } from 'mongoose'

type fileObject = {
	url: string,
	fileName: string,
	key: string
}

interface IOrder {
	procedureIdentifier: string,
	category: string,
	mode: string,
	title: string,
	customerName: string,
	description: string,
	price: number,
	files: fileObject[],
	dateOfPublication: Date,
	expirationDate: Date,
	ownerId: string,
}

export interface IOrderModel extends IOrder, Document {}
export interface IEditedOrderModel extends IOrder, Document {}
