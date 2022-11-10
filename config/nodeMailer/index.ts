import { createTransport } from 'nodemailer'
import { getGoogleAccessToken } from '../google'

export const getNodeMailerTransporter = async () => createTransport({
	service: 'gmail',
	auth: {
		type: 'oauth2',
		user: process.env.SENDER_EMAIL,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.REFRESH_TOKEN,
		accessToken: await getGoogleAccessToken()
	},
})