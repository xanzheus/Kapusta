import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid,please try again')
    .required('Email is required,please type your email'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters or more ')
    .max(20, 'Password must be 20 characters or less')
    .required('Password is required field'),
});

export default loginSchema;
