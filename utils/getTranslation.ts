import i18n from '../middlewares/i18n.config'

export const getTranslation = (key: string, language = 'pl') => i18n.__({ phrase: key, locale: language })