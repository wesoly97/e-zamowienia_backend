import i18n from '../middlewares/i18n.config'

export const getTranslation = (key: string) => i18n.__({ phrase: key, locale: 'pl' })