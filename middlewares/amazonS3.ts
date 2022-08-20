import S3, { ObjectIdentifierList } from 'aws-sdk/clients/s3'

const s3Bucket = () => new S3(
	{
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		region: process.env.AWS_BUCKET_REGION,
	}
)

export const fileUpload = async (file: Express.Multer.File) => {
	const uploadedFileData = await s3Bucket().upload({
		Bucket: process.env.AWS_BUCKET_NAME || '',
		Key: `${Math.floor(Date.now()/1000)}__${file.originalname}`.replace(/\s+/g,'_'),
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
