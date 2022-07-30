import i18n from '../middlewares/i18n.config'

export const getTranslation = ({ key = '', language = 'pl', arg = '' }) => i18n.__(
	{
		phrase: key,
		locale: language,
	}, arg
)