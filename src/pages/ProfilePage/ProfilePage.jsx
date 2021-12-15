import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userUpdateSchema, fileSchema } from '../../validationSchemas/userSchema';
import { LANGUAGE, CURRENCY, THEME } from '../../Constants';

import IconAvatar from 'components/IconAvatar';
import Container from 'components/Container';
import style from './ProfilePage.module.scss';

const ProfilePage = () => {
  const location = useLocation();
  const [locationFrom, setLocationFrom] = useState(location?.state?.from ?? '/');

  const user = {
    email: 'john.doe@gmail.com',
    fullName: {
      firstName: 'Nikolay',
      lastName: 'Mosalov',
    },
    avatar: 'https://live.staticflickr.com/65535/51355167828_34e6d20320_n.jpg',
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
          <div className={style.profile__wrapper}>
            <div className={style.profile__sidebar}>
              {/* <button className={style.profile__buttonBack}>Back</button> */}
              <Link className={style.button} type="button" to={locationFrom}>
                <ArrowBackIcon />
              </Link>

              <div className={style.avatar__wrapper}>
                {/* <IconAvatar src={avatar} width={300} height={300} />
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
                </form> */}
              </div>
              <div className={style.profile__info}>
                <h2 className={style.profile__name}>{`${firstName} ${lastName}`}</h2>{' '}
                <h3 className={style.profile__email}>{email}</h3>
              </div>
            </div>
            {/* <div>
              <h1 className={style.profile__text}>Profile Settings</h1>{' '}
              <form autoComplete="off" className={style.tableData} onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  className={style.tableData__field}
                  id="password"
                  name="password"
                  label=" New password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                  fullWidth
                  className={style.tableData__field}
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm  new password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <TextField
                  fullWidth
                  className={style.tableData__field}
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                  fullWidth
                  className={style.tableData__field}
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />

                <TextField
                  fullWidth
                  className={style.tableData__field}
                  id="language"
                  name="language"
                  label="Language"
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
                  fullWidth
                  className={style.tableData__field}
                  select
                  id="currency"
                  name="currency"
                  label="Currency"
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
                  fullWidth
                  className={style.tableData__field}
                  select
                  id="theme"
                  name="theme"
                  label="Theme"
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
                  disabled={!formik.dirty}
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Save
                </Button>
              </form>
            </div> */}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
