import  i18n from '../middlewares/i18n.config'

export function getTranslation(key: string) {
    console.log(i18n.__('user'))
    return i18n.__(key)
}