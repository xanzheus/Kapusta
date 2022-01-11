import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  firstName: Yup.string().max(15, 'Must be 15 characters or less'),
  lastName: Yup.string().max(15, 'Must be 15 characters or less'),
  email: Yup.string()
    .email('Email is invalid,please try again')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters or more ')
    .max(20, 'Password must be 20 characters or less')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords must match')
    .required('Password confirmation is required'),

  acceptedTerms: Yup.boolean()
    .required('User agreement is required')
    .oneOf([true], 'You must accept the terms of conditions'),
});

export default userSchema;
