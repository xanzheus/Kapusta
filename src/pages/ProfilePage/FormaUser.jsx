import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from 'components/Button';
import { makeStyles } from '@mui/styles';
import { EditPhoneModal } from 'components/Modal';
import { userUpdateSchema } from '../../validationSchemas/userSchema';
import { LANGUAGE, CURRENCY, THEME, COLORS } from '../../Constants';
import { useUpdateDataUserMutation } from 'redux/service/userAPI';
import style from './ProfilePage.module.scss';

// LOCALISE
import { useTranslation } from 'react-i18next';

const FormaUser = ({
  firstName = '',
  lastName = '',
  phone = '',
  language = LANGUAGE.RUSSIAN,
  currency = CURRENCY.HRYVNIA,
  theme = THEME.LIGHT,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [updateDataUser] = useUpdateDataUserMutation({
    fixedCacheKey: 'shared-update-user',
  });
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    return setOpen(!open);
  };

  // LOCALISE
  const { t } = useTranslation();

  const useStyles = makeStyles(theme => ({
    field: {
      '& .MuiInputLabel-root': {
        fontSize: 14,
        color: COLORS.auxiliaryDark,
      },

      '& .MuiTypography-root': {
        fontSize: '14px',
      },

      '& .MuiOutlinedInput-root': {
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 0,
        borderRadius: 30,
        backgroundColor: `${COLORS.auxiliaryLight}`,
        width: 252,
        '& fieldset': {
          width: 265,
          height: 55,
          border: 'none',
        },
        [theme.breakpoints.up('1280')]: {
          width: 380,
        },
      },
    },
  }));

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      password: '',
      confirmPassword: '',
      language,
      currency,
      theme,
    },
    validationSchema: userUpdateSchema,
    onSubmit: (values, formikBag) => {
      const newData = {
        // password: values.password,
        fullName: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        settings: {
          language: values.language,
          theme: values.theme,
          currency: values.currency,
        },
      };
      updateDataUser(newData);

      formikBag.setFieldValue('password', '');
      formikBag.setFieldValue('confirmPassword', '');
    },
  });

  return (
    <>
      <form className={style.tableData} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.field}
          id="password"
          name="password"
          label={t('formUser.newPassword')}
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
        />
        <TextField
          className={classes.field}
          id="confirmPassword"
          name="confirmPassword"
          label={t('formUser.confirmNewPassword')}
          type={showPassword ? 'text' : 'password'}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
        />
        <div className={style.phoneWrapper}>
          <TextField
            className={classes.field}
            id="phone"
            name="phone"
            label={t('formUser.phoneNumber')}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <IconButton
            className={style.profile__buttonEdit}
            aria-label={t('formUser.share')}
            onClick={toggleOpen}
            type={'button'}
          >
            <EditIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </div>

        <TextField
          className={classes.field}
          id="firstName"
          name="firstName"
          label={t('formUser.firstName')}
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          className={classes.field}
          id="lastName"
          name="lastName"
          label={t('formUser.lastName')}
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          className={classes.field}
          id="language"
          name="language"
          label={t('formUser.language')}
          select
          value={formik.values.language}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.language && Boolean(formik.errors.language)}
          helperText={formik.touched.language && formik.errors.language}
        >
          {Object.values(LANGUAGE).map(lang => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.field}
          select
          id="currency"
          name="currency"
          label={t('formUser.currency')}
          value={formik.values.currency}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.currency && Boolean(formik.errors.currency)}
          helperText={formik.touched.currency && formik.errors.currency}
        >
          {Object.values(CURRENCY).map(currency => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.field}
          select
          id="theme"
          name="theme"
          label={t('formUser.theme')}
          value={formik.values.theme}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.theme && Boolean(formik.errors.theme)}
          helperText={formik.touched.theme && formik.errors.theme}
        >
          {Object.values(THEME).map(theme => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
        </TextField>
        <Button
          name={t('formUser.saveButton')}
          type="submit"
          variant="centerAccent"
          disabled={!(formik.isValid && formik.dirty)}
        />
      </form>
      {open && <EditPhoneModal open={open} toggleOpen={toggleOpen} />}
    </>
  );
};

export default FormaUser;
