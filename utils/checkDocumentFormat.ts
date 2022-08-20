export const documentTypes = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/vnd.ms-excel',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/gzip',
	'application/zip',
	'application/x-7z-compressed',
	'application/vnd.oasis.opendocument.text',
	'text/plain',
	'application/vnd.oasis.opendocument.spreadsheet'
]

export const checkDocumentFormat = (format: string) => documentTypes.includes(format)