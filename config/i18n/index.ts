import { I18n } from 'i18n'
import path from 'path'

const i18n = new I18n()

const languages = ['pl', 'en']

i18n.configure({
	locales: languages,
	directory: path.join(__dirname, '../../translations'),
	objectNotation: true,
	cookie: 'lang',
})

export default i18n