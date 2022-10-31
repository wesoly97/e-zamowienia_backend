import { RequestHandler } from 'express'
import { getFileStream } from '../../middlewares/amazonS3'

export const getFile:RequestHandler = async (req, res) => {
	const key = req.params.key
	const fileObject = await getFileStream(key)
	const fileName = key.split('__')
	const fileNameNormalize = fileName[1].normalize('NFD').replace('ł','l').replace('Ł','L').replace(/[\u0300-\u036f]/g, '')

	res.set('content-disposition',`attachment; filename=${fileNameNormalize}`)
	fileObject.pipe(res)
}