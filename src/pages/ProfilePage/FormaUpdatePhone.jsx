import { useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from 'components/Button';
import { makeStyles } from '@mui/styles';
import { phoneSchema } from '../../validationSchemas/userSchema';
import { COLORS } from '../../Constants';
import { useSendRequestAcceptMutation, useUpdateDataUserMutation } from 'redux/service/userAPI';
import style from './ProfilePage.module.scss';

// LOCALISE
import { useTranslation } from 'react-i18next';

const FormaUpdatePhone = ({ phone = '', toggleOpen }) => {
  const [newPhone, setnewPhone] = useState('');
  const [sendRequestAccept, isSuccess] = useSendRequestAcceptMutation({
    fixedCacheKey: 'shared-update-user',
  });

  const [updateDataUser] = useUpdateDataUserMutation({
    fixedCacheKey: 'shared-update-user',
  });
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

  const formikPhone = useFormik({
    initialValues: {
      phone: phone || '',
      phoneVerified: false,
    },
    validationSchema: phoneSchema,
    onSubmit: (values, formikBag) => {
      setnewPhone(values.phone);
      const req = {
        phone: values.phone,
      };
      console.log(req);
      sendRequestAccept(req);
    },
  });

  const formikPhoneAccept = useFormik({
    initialValues: {
      code: '',
    },

    onSubmit: (values, formikBag) => {
      const req = {
        phone: newPhone,
        code: values.code,
      };
      toggleOpen();
      sendRequestAccept(req);
      if (isSuccess) {
        updateDataUser({ phone: newPhone });
      }
    },
  });

  return (
    <>
      <form className={style.tableData} onSubmit={formikPhone.handleSubmit}>
        <TextField
          className={classes.field}
          id="phone"
          name="phone"
          placeholder="+380671234567"
          type="text"
          label={t('formUpdatePhone.number')}
          value={formikPhone.values.phone}
          onBlur={formikPhone.handleBlur}
          onChange={formikPhone.handleChange}
          error={formikPhone.touched.phone && Boolean(formikPhone.errors.phone)}
          helperText={formikPhone.touched.phone && formikPhone.errors.phone}
        />
        <Button
          name={t('formUpdatePhone.getCode')}
          type="submit"
          variant="smallRight"
          disabled={!(formikPhone.isValid && formikPhone.dirty)}
        />
      </form>
      <form className={style.tableData} onSubmit={formikPhoneAccept.handleSubmit}>
        <TextField
          className={classes.field}
          id="code"
          name="code"
          label={t('formUpdatePhone.confirmCode')}
          value={formikPhoneAccept.values.code}
          onBlur={formikPhoneAccept.handleBlur}
          onChange={formikPhoneAccept.handleChange}
          error={formikPhoneAccept.touched.code && Boolean(formikPhoneAccept.errors.code)}
          helperText={formikPhoneAccept.touched.code && formikPhoneAccept.errors.code}
        />

        <Button
          name={t('statHeader.confirm')}
          type="submit"
          variant="accentButton"
          disabled={!formikPhoneAccept.dirty}
        />
      </form>
    </>
  );
};

export default FormaUpdatePhone;
