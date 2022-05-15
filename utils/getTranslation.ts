import  i18n from '../middlewares/i18n.config'

export function getTranslation(key: string) {
    return i18n.__(key)
}