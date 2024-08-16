import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './locales/eng.json';
import rus from './locales/rus.json';
import kaz from './locales/kaz.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            eng: { translation: eng },
            rus: { translation: rus },
            kaz: { translation: kaz },
        },
        lng: 'kaz', // Язык по умолчанию
        fallbackLng: 'rus',
        interpolation: {
            escapeValue: false,
        },
    });

    export default i18n;