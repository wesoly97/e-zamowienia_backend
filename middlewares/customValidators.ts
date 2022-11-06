import { CustomValidator } from 'express-validator'
import { checkDocumentFormat } from '../utils/checkDocumentFormat'
import { isCharLetterOrNumber } from '../utils/checkVariableType'
import { MAX_FILE_SIZE } from '../constants/files'
import { CATEGORIES_LANGUAGE_KEYS, MODES_LANGUAGE_KEYS } from '../constants/orders'
import { getTranslation } from '../utils/getTranslation'

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

export const isModeValid: CustomValidator  = (value, { req }) => Object.values(MODES_LANGUAGE_KEYS)
	.map(key => getTranslation({ key })).includes(value)

export const isCategoryValid: CustomValidator  = (value, { req }) => Object.values(CATEGORIES_LANGUAGE_KEYS)
	.map(key => getTranslation({ key })).includes(value)

export const isSamePasswords: CustomValidator  = (value, { req }) => value === req.body.password
export const isDifferentPassword: CustomValidator  = (value, { req }) => value !== req.body.password
