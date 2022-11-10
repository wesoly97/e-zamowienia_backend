import { getNodeMailerTransporter } from '../config/nodeMailer'

export const sendEmail = async (emailTo: string, emailContent: string, subject: string) => {
	const transporter = await getNodeMailerTransporter()
	const message = {
		from: `"${process.env.WEBSITE_TITLE}" <${process.env.SENDER_EMAIL}>`,
		to: emailTo,
		subject: subject,
		html: emailContent,
	}
	await transporter.sendMail(message)
}