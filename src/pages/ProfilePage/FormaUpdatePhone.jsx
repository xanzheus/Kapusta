import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from 'components/Button';
import { makeStyles } from '@mui/styles';
import { phoneSchema, userUpdatePhoneSchema } from '../../validationSchemas/userSchema';
import { LANGUAGE, CURRENCY, THEME, COLORS } from '../../Constants';
import { useSendRequestAcceptMutation } from 'redux/service/userAPI';
import style from './ProfilePage.module.scss';

const FormaUpdatePhone = ({ phone = '' }) => {
  const [sendRequestAccept] = useSendRequestAcceptMutation({
    fixedCacheKey: 'shared-update-user',
  });

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

  const formikPhone = useFormik({
    initialValues: {
      phone: phone || '+380(0**)***-**-**',
      phoneVerified: false,
    },
    validationSchema: phoneSchema,
    onSubmit: (values, formikBag) => {
      const req = {
        phone: values.phone,
        acceptCode: '',
      };
      console.log(req);
      sendRequestAccept(req);

      // formikBag.setFieldValue('password', '');
      // formikBag.setFieldValue('confirmPassword', '');
      // formikBag.setFieldValue('firstName', data.data.user.fullName.firstName);
      // formikBag.setFieldValue('lastName', values.lastName);
      // formikBag.setFieldValue('language', values.language);
      // formikBag.setFieldValue('currency', values.currency);
      // formikBag.setFieldValue('theme', values.theme);
    },
  });

  const formikPhoneAccept = useFormik({
    initialValues: {
      phone: formikPhone.values.phone,
      acceptCode: '',
    },

    onSubmit: (values, formikBag) => {
      console.log(values);
      // sendRequestAccept(values);

      formikBag.setFieldValue('acceptCode', '');
      // formikBag.setFieldValue('confirmPassword', '');
      // formikBag.setFieldValue('firstName', data.data.user.fullName.firstName);
      // formikBag.setFieldValue('lastName', values.lastName);
      // formikBag.setFieldValue('language', values.language);
      // formikBag.setFieldValue('currency', values.currency);
      // formikBag.setFieldValue('theme', values.theme);
    },
  });

  return (
    <>
      <form className={style.tableData} onSubmit={formikPhone.handleSubmit}>
        <TextField
          className={classes.field}
          id="phone"
          name="phone"
          placeholder="+38(067)123-12-12"
          type="text"
          label="Номер телефона"
          value={formikPhone.values.phone}
          onBlur={formikPhone.handleBlur}
          onChange={formikPhone.handleChange}
          error={formikPhone.touched.phone && Boolean(formikPhone.errors.phone)}
          helperText={formikPhone.touched.phone && formikPhone.errors.phone}
        />
        <Button
          name="Получить код"
          type="submit"
          variant="smallRight"
          disabled={!(formikPhone.isValid && formikPhone.dirty)}
        />
      </form>
      <form className={style.tableData} onSubmit={formikPhoneAccept.handleSubmit}>
        <TextField
          className={classes.field}
          id="acceptCode"
          name="acceptCode"
          label="Код подтверждения"
          value={formikPhoneAccept.values.acceptCode}
          onBlur={formikPhoneAccept.handleBlur}
          onChange={formikPhoneAccept.handleChange}
          error={
            formikPhoneAccept.touched.acceptCode && Boolean(formikPhoneAccept.errors.acceptCode)
          }
          helperText={formikPhoneAccept.touched.acceptCode && formikPhoneAccept.errors.acceptCode}
        />

        <Button
          name="Подтвердить"
          type="submit"
          variant="accentButton"
          disabled={!formikPhoneAccept.dirty}
        />
      </form>
    </>
  );
};

export default FormaUpdatePhone;
