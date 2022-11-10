import i18n from '../config/i18n'

export const getTranslation = ({ key = '', language = 'pl', arg = '' }) => i18n.__(
	{
		phrase: key,
		locale: language,
	}, arg
)