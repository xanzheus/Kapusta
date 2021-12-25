import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FORM
import { useFormik } from 'formik';
import loginSchema from 'validationSchemas/login';
// LOCALISE
import { useTranslation } from 'react-i18next';
// MUI
import { TextField, InputAdornment, IconButton } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from 'components/Button';
// REDUX STORE
import { useDispatch } from 'react-redux';
import { useLoginMutation } from 'redux/service/userAPI';
import { useGoogleAuthMutation } from 'redux/service/googleAuth';
import { setCredentials } from 'redux/service/authSlice';
// STYLES
import style from './loginForm.module.scss';
import { COLORS } from '../../Constants';
import { ReactComponent as GoogleIcon } from '../../images/google_icon.svg';

const LoginForm = () => {
  // DISPATCH TO STORE
  const dispatch = useDispatch();
  // NAVIGATION
  const navigate = useNavigate();
  const navigateToRegistration = () => {
    navigate('/');
  };

  const { t } = useTranslation();

  // REDUX HOOKS MUTATION
  const [login] = useLoginMutation();
  const [googleAuth] = useGoogleAuthMutation();
  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const useStyles = makeStyles({
    field: {
      '& .MuiInputAdornment-root': {
        position: 'absolute ',
        right: '8px',
      },
      '& .MuiInputLabel-root': {
        fontSize: 14,
      },

      '& .MuiTypography-root': {
        fontSize: '14px',
      },

      '& .MuiOutlinedInput-root': {
        // Работает
        position: 'relative',
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

  // useCustomStyle
  const classes = useStyles();
  // const { refreshToken } = useAuth();
  // console.log(refresToken);
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
          console.log('component', data.accessToken);
          dispatch(setCredentials(data));
          navigate('/balance');
        })
        .catch(error => console.log(error.message));
    },
  });

  return (
    <div className={style.box}>
      <form autoComplete="on" onSubmit={formik.handleSubmit}>
        <p className={style.registration__title}>
          Вы можете авторизоваться с помощью Google Account:
          {/* Вы можете авторизоваться с помощью Google Account: */}
        </p>
        <div className={style.google_button__wrapper}>
          <Button
            onClick={() => {
              googleAuth();
            }}
            variant="google__button"
            name="Google"
            type="button"
          >
            <GoogleIcon className={style.google__icon} />
          </Button>
        </div>
        <p className={style.registration__title}>
          Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
          {/* Или зайти с помощью e-mail и пароля: */}
        </p>

        <TextField
          className={classes.field}
          fullWidth
          // margin="normal"
          color="warning"
          id="email"
          name="email"
          label="Почта"
          // autocomplete="off"
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
          // autocomplete="off"
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

        <Stack mt={2} spacing={2} direction="row">
          <Button
            className={style.login__button}
            name="Вход"
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          ></Button>
          <Button onClick={navigateToRegistration} name="Регистрация" type="button"></Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
