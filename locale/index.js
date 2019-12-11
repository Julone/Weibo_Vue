import zh from './zh.js'
import en from './en.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n);
export default new VueI18n({
    locale: 'zh',
    messages:{
        en: {
          ...en,
          ...enLocale
        },
        zh: {
          ...zh,
          ...zhLocale
        }
    }
})