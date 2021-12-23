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
  balanceForm: {
    clearForm: 'The form is cleared!',
    amountGreaterZero: 'The amount must be greater than zero.',
    transactionAdded: 'Transaction added!',
    enterDescription: 'Enter a description',
    enterAmount: 'Enter the amount',
    enterButton: 'Input',
    clearButton: 'To clear',
  },
  balanceLine: {
    congratulations: 'Congratulations, everything is ready to go!',
    balance: 'Balance:',
    confirm: 'CONFIRM',
    reports: 'Go to reports',
  },
  balanceTable: {
    TransactionDeleted: 'Transaction deleted!',
    noChangesFound: 'No changes found!',
    itsClear: 'it is clear',
    сhangesSaved: 'Changes saved!',
    madeChange: 'If youve made a change, do not forget to save it!',
  },

  headersTabs: {
    consumption: 'Сonsumption',
    income: 'Income',
    productDescription: 'Product description',
    productCategory: 'Product category',
    descriptionIncome: 'Description of income',
    incomeCategory: 'Income category',
  },
  tranceActions: {
    transactionDeleted: 'Transaction deleted!',
    currencyUAH: 'UAH',
  },
  reportTable: {
    summary: 'Current year summary',
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
  balanceForm: {
    clearForm: 'Форма очищена!',
    amountGreaterZero: 'Сумма должна быть больше нуля.',
    transactionAdded: 'Трансакция добавлена!',
    enterDescription: 'Введите описание',
    enterAmount: 'Введите сумму',
    enterButton: 'ВВОД',
    clearButton: 'ОЧИСТИТЬ',
  },
  balanceLine: {
    congratulations: 'Поздравляем всё готово к работе!',
    balance: 'Баланс:',
    confirm: 'ПОДТВЕРДИТЬ',
    reports: 'Перейти к отчётам',
  },
  balanceTable: {
    transactionDeleted: 'Трансакция удалена!',
    noChangesFound: 'Изменения не обнаружены!',
    itsClear: 'Понятно',
    сhangesSaved: 'Изменения сохранены!',
    madeChange: 'Если вы внесли изминение, не забудьте сохранить их!',
  },
  headersTabs: {
    consumption: 'Расход',
    income: 'Доход',
    productDescription: 'Описание товара',
    productCategory: 'Категория товара',
    descriptionIncome: 'Описание дохода',
    incomeCategory: 'Категория дохода',
  },
  tranceActions: {
    transactionDeleted: 'Трансакция удалена!',
    currencyUAH: 'UAH',
  },
  reportTable: {
    summary: 'Сводка за текущий год',
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

// // LOCALISE
// import { useTranslation } from 'react-i18next';

// // LOCALISE
// const { t } = useTranslation();
