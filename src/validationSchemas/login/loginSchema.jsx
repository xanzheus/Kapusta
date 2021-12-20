import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Электронная почта недействительна, попробуйте еще раз')
    .required('Адрес электронной почты обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен состоять из 6 или более символов.')
    .max(20, 'Pпароль должен содержать не более 20 символов')
    .required('Пароль обязательное поле'),
});

export default loginSchema;
