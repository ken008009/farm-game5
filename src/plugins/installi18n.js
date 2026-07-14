import { createI18n } from 'vue-i18n';
import zh from '@/locales/zh';
import en from '@/locales/en';
import tw from '@/locales/tw';
import de from '@/locales/de';
import ar from '@/locales/ar';
import ko from '@/locales/ko';
import es from '@/locales/es';
import ru from '@/locales/ru';
import hi from '@/locales/hi';
import id from '@/locales/id';
import ja from '@/locales/ja';
import it from '@/locales/it';
import vi from '@/locales/vi';
import th from '@/locales/th';

const messages = {
    en,
    zh,
    tw,
    de,
    ar,
    ko,
    es,
    ru,
    hi,
    id,
    ja,
    it,
    vi,
    th,
};

const l = localStorage.getItem('language') || 'en'

const installi18n = createI18n({
    locale: l, // 默认语言
    fallbackLocale: 'en',
    legacy: false,
    messages,
});

export default installi18n
