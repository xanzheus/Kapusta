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
    transactionUpdate: 'Transaction update',
    enterDescription: 'Enter a description',
    enterAmount: 'Enter the amount',
    enterButton: 'Input',
    clearButton: 'To clear',
  },
  MobileEditForm: {
    updateButton: 'Update',
    NothingHasChanged: 'Nothing has changed!',
  },
  balanceLine: {
    congratulations: 'Congratulations, everything is ready to go!',
    balance: 'Balance:',
    confirm: 'CONFIRM',
    reports: 'Go to reports',
  },
  balanceTable: {
    transactionDeleted: 'Transaction deleted!',
    noChangesFound: 'No changes found!',
    itsClear: 'it is clear',
    сhangesSaved: 'Changes saved!',
    madeChange: 'If youve made a change, do not forget to save it!',
  },

  headersTabs: {
    consumption: 'Expense',
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
  footer: {
    allRightsReserved: 'All rights reserved',
    developed: 'Developed with',
    students: 'students',
  },
  modal: {
    phone: ' Enter your phone number',
    sendInvite: 'Send an invitation to a friend',
    friendsMail: 'Friend mail',
    friendName: 'Friend name',
    sendButton: 'Send',
    cancelButton: 'Cancel',
    editTitle: 'Editing information',
    edit: 'In order to edit the cell you need, you need to double-click on the desired cell and then make your change. During the editing process, you will receive notifications for your convenience :)',
    sure: 'Are you sure?',
    yes: 'Yes',
    no: 'No',
  },
  catagories: {
    products: 'products',
    home: 'home',
    entertainment: 'entertainment',
    healthy: 'healthy',
    transport: 'transport',
    alcohol: 'alcohol',
    technic: 'technic',
    communication: 'communication',
    hobby: 'hobby',
    education: 'education',
    other: 'other',
    salary: 'salary',
    additional: 'additional',
  },
  graphDetails: {
    catagory: 'categories',
    selectCategory: 'Select a category',
  },
  incomeCosts: {
    costs: 'Costs',
    income: 'Income',
  },
  statHeader: {
    backButton: 'Go back to the main page',
    balance: 'Balance',
    confirm: 'Сonfirm',
  },

  period: {
    period: 'Current period',
    from: 'Period from',
    to: 'Period to',
    exit: 'Logout',
  },
  month: {
    changeLn: 'en',
  },
  formUpdatePhone: {
    number: 'Phone number',
    getCode: 'Get code',
    confirmCode: 'Confirm code',
  },
  formUser: {
    newPassword: 'New password',
    confirmNewPassword: 'Confirm new password',
    phoneNumber: 'Phone number',
    share: 'Share with a friend',
    firstName: 'First name',
    lastName: 'Last name',
    language: 'language',
    currency: 'currency',
    theme: 'theme',
    saveButton: 'Save',
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
    transactionUpdate: 'Транзакция обновлена!',
    enterDescription: 'Введите описание',
    enterAmount: 'Введите сумму',
    enterButton: 'ВВОД',
    clearButton: 'ОЧИСТИТЬ',
  },
  MobileEditForm: {
    updateButton: 'Обновить',
    NothingHasChanged: 'Изменений нет!',
  },
  balanceLine: {
    congratulations: 'Поздравляем всё готово к работе!',
    balance: 'Баланс:',
    confirm: 'ПОДТВЕРДИТЬ',
    reports: 'Перейти к отчётам',
  },
  balanceTable: {
    transactionDeleted: 'Транзакция удалена!',
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
    transactionDeleted: 'Транзакция удалена!',
    currencyUAH: 'UAH',
  },
  reportTable: {
    summary: 'Сводка за текущий год',
  },
  footer: {
    allRightsReserved: 'Все права защищены',
    developed: 'Разработано с',
    students: 'студентами',
  },
  modal: {
    phone: ' Укажите ваш номер телефона',
    sendInvite: 'Отправить другу приглашение',
    friendsMail: 'Почта друга',
    friendName: 'Имя друга',
    sendButton: 'Отправить',
    cancelButton: 'Отмена',
    editTitle: 'Информация о редактирование',
    edit: 'Для того что бы редактировать нужную вам ячейку, вам необходимо дважды кликнуть по нужной ячейке и после внести своё изменение. В процессе редактирования вы будите получать уведомления, для вашего удобства :)',
    sure: 'Вы уверены?',
    yes: 'Да',
    no: 'Нет',
  },
  catagories: {
    products: 'Продукты',
    home: 'Всё для дома',
    entertainment: 'Развлечения',
    healthy: 'Здоровье',
    transport: 'Транспорт',
    alcohol: 'Алкоголь',
    technic: 'Техника',
    communication: 'Коммуналка, связь',
    hobby: 'Спорт, хобби',
    education: 'Образование',
    other: 'Разное',
    salary: 'ЗП',
    additional: 'Доп.доход',
  },
  graphDetails: {
    catagory: 'Категории',
    selectCategory: 'Выберите категорию',
  },
  incomeCosts: {
    costs: 'Расходы',
    income: 'Доходы',
  },
  statHeader: {
    backButton: 'Вернуться на главную',
    balance: 'Баланс',
    confirm: 'Подтвердить',
  },
  period: {
    period: 'Текущий период',
    from: 'Период c',
    to: 'Период до',
    exit: 'Выйти',
  },
  month: {
    changeLn: 'ru',
  },
  formUpdatePhone: {
    number: 'Номер телефона',
    getCode: 'Пoлучить код',
    confirmCode: 'Код подтверждения',
  },
  formUser: {
    newPassword: 'Новый пароль',
    confirmNewPassword: 'Подтвердите новый пароль',
    phoneNumber: 'Номер телефона',
    share: 'Поделиться с другом',
    firstName: 'Имя',
    lastName: 'Фамилия',
    language: 'Язык',
    currency: 'Валюта',
    theme: 'Тема',
    saveButton: 'Сохранить',
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
