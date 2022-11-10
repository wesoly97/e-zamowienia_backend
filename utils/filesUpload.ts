import { ObjectIdentifierList } from 'aws-sdk/clients/s3'
import { s3Bucket } from '../config/amazonS3'

export const fileUpload = async (file: Express.Multer.File) => {
	const uploadedFileData = await s3Bucket().upload({
		Bucket: process.env.AWS_BUCKET_NAME || '',
		Key: `${Math.floor(Date.now()/1000)}__${file.originalname.replace('__','_')}`.replace(/\s+/g,'_'),
		Body: file.buffer,
	}).promise()

	return uploadedFileData.Key
}

export const getFileStream = (fileKey: string) => s3Bucket().getObject({
	Key: fileKey,
	Bucket: process.env.AWS_BUCKET_NAME || ''
}).createReadStream()

export const deleteFiles = (keys: object[]) => {
	if(keys.length > 0)
		return s3Bucket().deleteObjects({
			Bucket: process.env.AWS_BUCKET_NAME || '',
			Delete: {
				Objects: keys as ObjectIdentifierList,
				Quiet: true
			}
		}).promise()
	else
		return Promise.resolve()
}
