import { RequestHandler } from 'express'
import { CATEGORIES_LANGUAGE_KEYS, MODES_LANGUAGE_KEYS } from '../../constants/orders'
import { DOCUMENT_TYPES, MAX_FILE_SIZE } from '../../constants/files'
import { getTranslation } from '../../utils/getTranslation'

export const getSettings:RequestHandler = async (req, res) => res.status(200).json({
	orderModes: Object.values(MODES_LANGUAGE_KEYS).map(key => getTranslation({ key })),
	orderCategories: Object.values(CATEGORIES_LANGUAGE_KEYS).map(key => getTranslation({ key })),
	maxFileSize:MAX_FILE_SIZE,
	fileTypes: Object.fromEntries(DOCUMENT_TYPES.map(type => [type, []]))
})