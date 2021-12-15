import React from 'react';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from 'components/Button';
// import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { userSchema } from 'validationSchemas/userSchema';
// import { makeStyles } from '@mui/styles';
import { useCreateUserMutation } from 'redux/service/userAPI';
import style from './registrationForm.module.scss';
// CUSTOM HOOKS

// import Input from '../FormComponents/Input';
// import CheckBox from 'components/FormComponents/CheckBox';

// const useStyles = makeStyles({
//   root: {},
// });

const RegistrationForm = () => {
  const [createUser] = useCreateUserMutation();
  // const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      createUser(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={style.box}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <p className={style.registration__title}>
          Вы можете авторизоваться с помощью Google Account:
        </p>
        <div className={style.button__wrapper}>
          <Button name="Google" type="submit"></Button>
        </div>
        <p className={style.registration__title}>
          Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
        </p>
        <TextField
          className={style.registration__input}
          fullWidth
          id="email"
          name="email"
          label="Электронная почта:"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          margin="normal"
        />
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Ваше Имя"
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin="normal"
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Ваша фамилия"
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="acceptedTerms"
              name="acceptedTerms"
              value={formik.values.acceptedTerms}
              onChange={formik.handleChange}
              error={formik.touched.acceptedTerms && Boolean(formik.errors.acceptedTerms)}
            />
          }
          label="Пользовательское соглашения"
        ></FormControlLabel>
        <Button name="Войти" disabled={!(formik.isValid && formik.dirty)} type="submit"></Button>
        <Button name="Регистрация" type="submit"></Button>
      </form>
    </div>
  );
};

// const RegistrationForm = () => {
//   return (
//     <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         acceptedTerms: '',
//       }}
//       validationSchema={userSchema}
//       validateOnMount
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ isValid }) => (
//         <Form>
//           <label>
//             First Name
//             <Field name="firstName" type="text" />
//             <ErrorMessage name="firstName" />
//           </label>

//           <label>Last Name</label>
//           <Field name="lastName" type="text" />
//           <ErrorMessage name="lastName" />

//           <label htmlFor="email">Email Address</label>
//           <Field name="email" type="email" />
//           <ErrorMessage name="email" />

//           <label htmlFor="password">Password</label>
//           <Field name="password" type="password" />
//           <ErrorMessage name="password" />

//           <label htmlFor="confirmPassword">Confirm password</label>
//           <Field name="confirmPassword" type="password" />
//           <ErrorMessage name="confirmPassword" />

//           <label>
//             <a href="#">I accepted terms conditions</a>
//             <Field name="acceptedTerms" type="checkbox" />
//           </label>
//           <ErrorMessage name="acceptedTerms" />

//           <button disabled={!isValid} type="submit">
//             register
//           </button>

//           <button type="submit">Login</button>

//           <button type="submit">Login with Google</button>

//           {/* WITH CUSTOM HOOKS  */}

//           {/* <Input label="First-name" type="text" id="firstName" name="firstName" placeholder="" />
//           <Input label="Last-name" type="text" id="lastName" name="lastName" placeholder="" />
//           <Input label="Email Address" type="email" id="email" name="email" placeholder="" />
//           <Input label="Password" type="password" id="password" name="password" placeholder="" />
//           <Input
//             label="Confirm password"
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder=""
//           />
//           <CheckBox name="acceptedTerms"> I accepted terms conditions</CheckBox> */}
//         </Form>
//       )}
//     </Formik>
//   );
// };

export default RegistrationForm;
