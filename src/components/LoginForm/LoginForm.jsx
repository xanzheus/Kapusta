import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FORM
import { useFormik } from 'formik';
import loginSchema from 'validationSchemas/login';
// LOCALISE
import { useTranslation } from 'react-i18next';
// MUI
import { TextField, InputAdornment, IconButton } from '@mui/material/';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from 'components/Button';
import ButtonGoogle from 'components/Button/Google';
// REDUX STORE
import { useDispatch } from 'react-redux';
import { useLoginMutation } from 'redux/service/userAPI';
import { setCredentials } from 'redux/service/authSlice';
// STYLES
import style from './loginForm.module.scss';
import useStyles from './loginFormMUIstyles';
import { ReactComponent as GoogleIcon } from '../../images/google_icon.svg';

const LoginForm = () => {
  // DISPATCH TO STORE
  const dispatch = useDispatch();
  // NAVIGATION
  const navigate = useNavigate();
  const navigateToRegistration = () => {
    navigate('/');
  };
  // LOCALIZATION
  const { t } = useTranslation();

  // REDUX HOOKS MUTATION
  const [login] = useLoginMutation();

  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // useCustomStyle
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,

    onSubmit: ({ email, password }) => {
      login({ email, password })
        .unwrap()
        .then(({ data }) => {
          // console.log('component', data.accessToken);
          dispatch(setCredentials(data));
          navigate('/balance');
        })
        .catch(error => console.log(error.message));
    },
  });

  return (
    <div className={style.box}>
      <form autoComplete="on" onSubmit={formik.handleSubmit}>
        <p className={style.registration__title}>{t('registration.googleTitle')}</p>
        <div className={style.google_button__wrapper}>
          <ButtonGoogle variant="google__button" name="Google" type="button">
            <GoogleIcon className={style.google__icon} />
          </ButtonGoogle>
        </div>
        <p className={style.registration__title}>{t('registration.mainTitle')}</p>

        <TextField
          className={classes.field}
          fullWidth
          color="warning"
          id="email"
          name="email"
          label={t('registration.email')}
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
          label={t('registration.password')}
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />

        <Stack mt={2} spacing={2} direction="row">
          <Button
            className={style.login__button}
            name={t('registration.enter')}
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          ></Button>
          <Button
            onClick={navigateToRegistration}
            name={t('registration.registration')}
            type="button"
          ></Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
