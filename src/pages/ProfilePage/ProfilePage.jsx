import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import Button from '@mui/material/Button';
import Button from 'components/Button';
import { InviteModal } from 'components/Modal';
import { makeStyles } from '@mui/styles';
import ShareIcon from '@mui/icons-material/Share';
import { userUpdateSchema, fileSchema } from '../../validationSchemas/userSchema';
import { LANGUAGE, CURRENCY, THEME, COLORS } from '../../Constants';

import IconAvatar from 'components/IconAvatar';
import Container from 'components/Container';
import style from './ProfilePage.module.scss';

const ProfilePage = () => {
  const location = useLocation();
  const [locationFrom, setLocationFrom] = useState(location?.state?.from ?? '/');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  ////////////test////////////////////////////
  const user = {
    email: 'john.doe@gmail.com',
    fullName: {
      firstName: 'Nikolay',
      lastName: 'Mosalov',
    },
    avatar: 'https://www.belanta.vet/vet-blog/wp-content/uploads/2019/09/5-4.jpg',
    settings: {
      language: 'en',
      theme: 'light',
      currency: 'UAH',
    },
  };

  const {
    email,
    fullName: { firstName, lastName },
    avatar,
    settings: { language, theme, currency },
  } = user;
  /////////===========///////////////

  // const themeStyles = createTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1536,
  //     },
  //   },
  // });

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
        marginBRight: 'auto',
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

  // useCustomStyle
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email: '',
      password: '',
      confirmPassword: '',
      language,
      currency,
      theme,
    },
    validationSchema: userUpdateSchema,
    onSubmit: (values, formikBag) => {
      console.log(values);
      formikBag.setFieldValue('password', '');
      formikBag.setFieldValue('confirmPassword', '');
    },
  });

  const formikAvatar = useFormik({
    initialValues: {
      file: null,
    },

    onSubmit: values => {
      console.log(values.file);
    },
  });

  return (
    <>
      <section className={style.profile}>
        <Container>
          <IconButton
            className={style.profile__buttonShare}
            aria-label="Поделиться с другом"
            onClick={handleOpen}
            // onMouseDown={handleMouseDownPassword}
          >
            <ShareIcon
              sx={{ fontSize: 36, color: COLORS.mainAccent }}
              titleAccess={'Поделиться с другом'}
            />
          </IconButton>

          <Link className={style.buttonBack} type="button" to={locationFrom}>
            <ArrowBackIcon />
          </Link>
          <div className={style.profile__wrapper}>
            <div className={style.profile__sidebar}>
              <div className={style.avatar__wrapper}>
                <IconAvatar src={avatar} width={240} height={240} />
                <form
                  autoComplete="off"
                  className={style.addFile__form}
                  aria-label="Profile picture"
                  onSubmit={formikAvatar.handleSubmit}
                >
                  <input
                    className={style.addFile__input}
                    type="file"
                    name="avatarUpload"
                    id="avatarUpload"
                    hidden
                    onChange={event => {
                      formikAvatar.setFieldValue('file', event.currentTarget.files[0]);
                      formikAvatar.submitForm();
                    }}
                    //   const fileReader = new FileReader();
                    //   fileReader.onload = () => {
                    //     if (fileReader.readyState === 2) {
                    //       formikAvatar.setFieldValue('file', fileReader.result);
                    //     }
                    //   };
                    //   fileReader.readAsDataURL(event.target.files[0]);
                    // }}
                  ></input>

                  <label htmlFor="avatarUpload">
                    <AddPhotoAlternateIcon
                      type="button"
                      variant="contained"
                      fontSize="string"
                      className={style.profile__buttonEdit}
                      titleAccess="add Photo"
                    ></AddPhotoAlternateIcon>
                  </label>
                </form>
              </div>

              <div className={style.profile__info}>
                <h2 className={style.profile__name}>{`${firstName} ${lastName}`}</h2>{' '}
                <h3 className={style.profile__email}>{email}</h3>
              </div>
            </div>
            <div className={style.profile__settings}>
              {/* <h1 className={style.profile__text}>Настройки пользователя</h1>{' '} */}
              <form autoComplete="off" className={style.tableData} onSubmit={formik.handleSubmit}>
                <TextField
                  // className={style.tableData__field}
                  className={classes.field}
                  id="password"
                  name="password"
                  label="Новый пароль"
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
                  label="Подтвердите новый пароль"
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
                <TextField
                  className={classes.field}
                  id="firstName"
                  name="firstName"
                  label="Имя"
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
                  label="Фамилия"
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />

                <TextField
                  // className={style.tableData__field}
                  className={classes.field}
                  id="language"
                  name="language"
                  label="Язык"
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
                  label="Валюта"
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
                  label="Тема"
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
                <Button name="Сохранить" type="submit" variant="center" />
              </form>
            </div>
          </div>
          {open && <InviteModal open={open} handleClose={handleClose} />}
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
