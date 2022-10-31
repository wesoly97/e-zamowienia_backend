import { CustomValidator } from 'express-validator'
import { checkDocumentFormat } from '../utils/checkDocumentFormat'
import { isCharLetterOrNumber } from '../utils/checkVariableType'
import { MAX_FILE_SIZE } from '../constants/files'

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

export const isFirstCharNumberOrLetter: CustomValidator  = (value, { req }) => {
	if(!value)
		return true
	return isCharLetterOrNumber(value[0])
}

export const isSamePasswords: CustomValidator  = (value, { req }) => {
	return value === req.body.password
}