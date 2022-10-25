import { DOCUMENT_TYPES } from '../constants/files'


export const checkDocumentFormat = (format: string) => DOCUMENT_TYPES.includes(format)