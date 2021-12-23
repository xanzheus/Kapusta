import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from 'components/Button';
import CancelIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { inviteFriendSchema } from '../../../validationSchemas/userSchema';
import { COLORS } from '../../../Constants';
import { useInviteFriendMutation } from 'redux/service/userAPI';
import style from './inviteModal.module.scss';

// LOCALISE
import { useTranslation } from 'react-i18next';

const modalRoot = document.querySelector('#modal-root');

const InviteModal = ({ open, handleClose }) => {
  const [inviteFriend] = useInviteFriendMutation();

  // LOCALISE
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },

    validationSchema: inviteFriendSchema,
    onSubmit: (values, formikBag) => {
      inviteFriend({
        friendEmail: values.email,
        friendName: values.name,
      });
      console.log(`send invite for friend ${values.name} to ${values.email}`);
      handleClose();

      formikBag.setFieldValue('email', '');
      formikBag.setFieldValue('name', '');
    },
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
      },
      // '& .MuiBox-root': {
      //   minWidth: 300,
      // },
    },
  }));

  const classes = useStyles();

  return createPortal(
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={style.modal}>
          <CancelIcon className={style.modal__close_button} onClick={handleClose} />
          <Typography className={style.modal__title} id="keep-mounted-modal-title" mt={6} mb={2}>
            {t('modal.sendInvite')}
          </Typography>
          <form autoComplete="off" className={style.tableData} onSubmit={formik.handleSubmit}>
            <TextField
              className={classes.field}
              id="email"
              name="email"
              label={t('modal.friendsMail')}
              type={'text'}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className={classes.field}
              id="name"
              name="name"
              label={t('modal.friendName')}
              type={'text'}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
              <Button type="submit" name={t('modal.sendButton')} variant="accentButton" />
              <Button type="button" name={t('modal.cancelButton')} onClick={handleClose} />
            </Stack>
          </form>
        </Box>
      </Modal>
    </>,
    modalRoot,
  );
};

InviteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default InviteModal;
