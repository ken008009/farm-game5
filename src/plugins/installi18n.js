import { createI18n } from 'vue-i18n';
import zh from '@/locales/zh';
import en from '@/locales/en';

const messages = {
    en,
    zh,
};

const l = localStorage.getItem('language') || 'en'

const installi18n = createI18n({
    locale: l, // 默认语言
    fallbackLocale: l,
    legacy: false,
    messages,
});

export default installi18n