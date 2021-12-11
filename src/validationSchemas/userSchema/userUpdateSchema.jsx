import * as Yup from 'yup';

const userUpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(15, 'Must be 15 characters or less'),
  lastName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(15, 'Must be 15 characters or less'),
  password: Yup.string().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
    'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'passwords must match'),
  // .required('Confirm password is required field'),
  language: Yup.string().matches(/(en|ru|ua)/),
  theme: Yup.string().matches(/(light|dark)/),
  currency: Yup.string().matches(/(UAH|EUR|USD|ZLT|RUB)/),
});

export default userUpdateSchema;
