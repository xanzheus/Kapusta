import { useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from 'components/Button';
import { makeStyles } from '@mui/styles';
import { phoneSchema } from '../../validationSchemas/userSchema';
import { COLORS } from '../../Constants';
import { useSendRequestAcceptMutation } from 'redux/service/userAPI';
import style from './ProfilePage.module.scss';

const FormaUpdatePhone = ({ phone = '' }) => {
  const [newPhone, setnewPhone] = useState('');
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
      phone: phone || '',
      phoneVerified: false,
    },
    validationSchema: phoneSchema,
    onSubmit: (values, formikBag) => {
      console.log(values.phone);
      setnewPhone(values.phone);
      console.log(newPhone);
      const req = {
        phone: values.phone,
        acceptCode: '',
      };
      console.log(req);
      sendRequestAccept(req);
    },
  });

  const formikPhoneAccept = useFormik({
    initialValues: {
      acceptCode: '',
    },

    onSubmit: (values, formikBag) => {
      const req = {
        phone: newPhone,
        acceptCode: values.acceptCode,
      };
      console.log(req);
      sendRequestAccept(req);
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
