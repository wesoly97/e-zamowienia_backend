import { RequestHandler } from 'express'
import { getFileStream } from '../../middlewares/amazonS3'

export const getFile:RequestHandler = async (req, res) => {
	const key = req.params.key
	const fileObject = await getFileStream(key)
	const fileName = key.split('__')
	res.set('content-disposition',`attachment; filename=${fileName[1]}`)
	fileObject.pipe(res)
}