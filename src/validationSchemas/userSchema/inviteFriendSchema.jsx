import * as Yup from 'yup';

const inviteFriendSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid,please try again')
    .required('Адрес электронной почты обязателен'),
  name: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(15, 'Must be 15 characters or less'),
});

export default inviteFriendSchema;
