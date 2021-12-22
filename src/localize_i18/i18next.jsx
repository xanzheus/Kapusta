import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
const translationEN = {
  registration: {
    googleTitle: 'You can log in with your Google Account:',
    mainTitle: 'Or log in using your e-mail and password, after registering:',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm the password',
    firstName: 'First Name',
    lastName: 'Last Name',
    aceptedTerms: 'User Agreement',
    registration: 'Registration',
    enter: 'Enter',
  },
};
const translationRU = {
  registration: {
    googleTitle: 'Вы можете авторизоваться с помощью Google Account:',
    mainTitle: 'Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:',
    email: 'Почта',
    password: 'Пароль',
    confirmPassword: 'Подтвердите Пароль',
    firstName: 'Ваше Имя',
    lastName: 'Ваша Фамилия',
    aceptedTerms: 'Пользовательское соглашение',
    registration: 'Регистрация',
    enter: 'Войти',
  },
};
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
