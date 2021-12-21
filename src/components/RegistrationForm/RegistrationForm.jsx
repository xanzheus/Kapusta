import { useState } from 'react';
import { useFormik } from 'formik';
// API
import { useCreateUserMutation } from 'redux/service/userAPI';
import { useGoogleAuthMutation } from 'redux/service/googleAuth';
import { userSchema } from 'validationSchemas/userSchema';
import { useNavigate } from 'react-router-dom';
// MUI
import { TextField, InputAdornment, IconButton } from '@mui/material/';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from 'components/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
// STYLES
import { COLORS } from '../../Constants';
import style from './registrationForm.module.scss';
import { ReactComponent as GoogleIcon } from '../../images/google_icon.svg';

const useStyles = makeStyles({
  field: {
    '& .MuiInputLabel-root': {
      fontSize: 14,
    },

    '& .MuiTypography-root': {
      fontSize: '14px',
    },

    '& .MuiOutlinedInput-root': {
      // Работает
      backgroundColor: `${COLORS.auxiliaryLight}`,
      borderRadius: 30,
      marginBottom: 15,
      '& fieldset': {
        borderRadius: 30,
        width: 265,
        height: 55,
        // background: '#F6F7FB',
        borderColor: 'transparent',
      },

      '& input': {
        padding: '13px 14px',
        borderRadius: 30,
      },
    },
  },
});

const RegistrationForm = () => {
  // API_Hook
  const [createUser] = useCreateUserMutation();
  const [googleAuth] = useGoogleAuthMutation();
  const navigate = useNavigate();
  const moveToLogin = () => {
    navigate('/login');
  };
  // useCustomStyle
  const classes = useStyles();

  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    // formik_State

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
        <div className={style.google_button__wrapper}>
          <Button
            onClick={() => {
              googleAuth();
            }}
            variant="google__button"
            type="button"
          >
            <GoogleIcon className={style.google__icon} />
            Google
          </Button>
        </div>
        <p className={style.registration__title}>
          Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
        </p>
        <TextField
          className={classes.field}
          fullWidth
          // margin="normal"
          color="warning"
          id="email"
          name="email"
          label="Электронная почта:"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />

        <TextField
          className={classes.field}
          fullWidth
          // margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          color="warning"
          id="password"
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />

        <TextField
          className={classes.field}
          fullWidth
          // margin="normal"
          color="warning"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="confirmPassword"
          name="confirmPassword"
          label="Подтвердите пароль"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          required
        />
        <TextField
          className={classes.field}
          fullWidth
          // margin="normal"
          color="warning"
          id="firstName"
          name="firstName"
          label="Ваше Имя"
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          className={classes.field}
          fullWidth
          // margin="normal"
          color="warning"
          id="lastName"
          name="lastName"
          label="Ваша фамилия"
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <FormControlLabel
          className={classes.field}
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
        <Stack mt={2} spacing={2} direction="row">
          <Button
            className={style.login__button}
            name="Регистрация"
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          ></Button>
          <Button name="Войти" type="button" onClick={moveToLogin}></Button>
        </Stack>
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
