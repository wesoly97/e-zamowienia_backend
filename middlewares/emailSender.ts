import { createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { getEmailAccessToken } from './oAuth2Authorization'

export const sendEmail = async (emailTo: string, emailContent: string, subject: string) => {
	const nodemailerOptions: SMTPTransport.Options = {
		service: 'gmail',
		auth: {
			type: 'oauth2',
			user: process.env.SENDER_EMAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: await getEmailAccessToken() as string
		},
	}
	const transporter = createTransport(nodemailerOptions)

	const message = {
		from: `"${process.env.WEBSITE_TITLE}" <${process.env.SENDER_EMAIL}>`,
		to: emailTo,
		subject: subject,
		html: emailContent,
	}
	await transporter.sendMail(message)
}