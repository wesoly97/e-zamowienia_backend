import S3 from 'aws-sdk/clients/s3'

export const s3Bucket = () => new S3(
	{
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		region: process.env.AWS_BUCKET_REGION,
	}
)