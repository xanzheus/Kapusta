import { useState } from 'react';
// FORM
import { useFormik } from 'formik';
// LOCALISE
import { useTranslation } from 'react-i18next';
// API
import { useCreateUserMutation } from 'redux/service/userAPI';
import { userSchema } from 'validationSchemas/userSchema';
import { useNavigate } from 'react-router-dom';
// MUI
import { TextField, InputAdornment, IconButton } from '@mui/material/';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from 'components/Button';
import ButtonGoogle from 'components/Button/Google';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
// STYLES
import toast from 'react-hot-toast';
import useStyles from './registrationFormMUIstyles';
import style from './registrationForm.module.scss';
import { ReactComponent as GoogleIcon } from '../../images/google_icon.svg';

const RegistrationForm = () => {
  // API_Hook
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/login');
  };
  // LOCALISE Fn
  const { t } = useTranslation();
  // useCustomStyle
  const classes = useStyles();

  // showPassword
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    // formik state

    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      createUser(newUser)
        .unwrap()
        .then(({ message }) => {
          if (message === 'success') {
            toast.success(t('registration.registration_success'));
          }
        })
        .catch(error => {
          console.log(error.status);
          if (error.status === 400) {
            toast.error(t('registration.registration_error'));
          }
        });

      resetForm(formik.initialValues);
    },
  });

  return (
    <div className={style.box}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <p className={style.registration__title}>{t('registration.googleTitle')}</p>
        <div className={style.google_button__wrapper}>
          <ButtonGoogle variant="google__button" type="button" name="Google">
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
          label={t('registration.confirmPassword')}
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
          label={t('registration.firstName')}
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
          label={t('registration.lastName')}
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
            />
          }
          label={t('registration.aceptedTerms')}
        ></FormControlLabel>
        <Stack mt={2} spacing={2} direction="row">
          <Button
            className={style.login__button}
            name={t('registration.registration')}
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          ></Button>
          <Button name={t('registration.enter')} type="button" onClick={moveToLogin}></Button>
        </Stack>
      </form>
    </div>
  );
};

export default RegistrationForm;
