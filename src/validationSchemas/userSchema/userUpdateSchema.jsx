import * as Yup from 'yup';

const userUpdateSchema = Yup.object().shape({
  firstName: Yup.string().max(15, 'Must be 15 characters or less'),
  lastName: Yup.string().max(15, 'Must be 15 characters or less'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters or more ')
    .max(20, 'Password must be 20 characters or less'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'passwords must match'),
  // .required('Confirm password is required field'),
  language: Yup.string().matches(/(en|ru|ua)/),
  theme: Yup.string().matches(/(light|dark)/),
  currency: Yup.string().matches(/(UAH|EUR|USD|ZLT|RUB)/),
});

export default userUpdateSchema;
