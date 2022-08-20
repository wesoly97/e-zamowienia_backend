import { CustomValidator } from 'express-validator'
import { checkDocumentFormat } from '../utils/checkDocumentFormat'

const MAX_FILE_SIZE = 20971520

export const isFileDocumentFormatValid: CustomValidator  = (value, { req }) => {
	const validDocumentArray = []
	const uploadedFiles = req.files
	uploadedFiles.map((file:Express.Multer.File) => {
		if(checkDocumentFormat(file.mimetype)) {
			validDocumentArray.push(file)
		}
	})
	return validDocumentArray.length === uploadedFiles.length
}

export const isFileDocumentSizeValid: CustomValidator  = (value, { req }) => {
	const validDocumentArray = []
	const uploadedFiles = req.files
	uploadedFiles.map((file:Express.Multer.File) => {
		if(file.size <= MAX_FILE_SIZE) {
			validDocumentArray.push(file)
		}
	})
	return validDocumentArray.length === uploadedFiles.length
}