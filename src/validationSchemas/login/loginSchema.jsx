import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid, please try again')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'The password must be 6 or more characters.')
    .max(20, 'Password must be no more than 20 characters')
    .required('Password is required'),
});

export default loginSchema;
