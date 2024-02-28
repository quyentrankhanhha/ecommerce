import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import COMMON_EN from 'src/locales/en/common.json'
import COMMON_VI from 'src/locales/vi/common.json'
import CART_EN from 'src/locales/en/cart.json'
import CART_VI from 'src/locales/vi/cart.json'
import LOGIN_EN from 'src/locales/en/login.json'
import LOGIN_VI from 'src/locales/vi/login.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

export const resources = {
  en: {
    common: COMMON_EN,
    cart: CART_EN,
    login: LOGIN_EN,
    product: PRODUCT_EN
  },
  vi: {
    common: COMMON_VI,
    cart: CART_VI,
    login: LOGIN_VI,
    product: PRODUCT_VI
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    ns: ['cart'],
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  })
