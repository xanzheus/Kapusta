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
import FormaUpdatePhone from 'pages/ProfilePage/FormaUpdatePhone';
import { useInviteFriendMutation } from 'redux/service/userAPI';
import style from './EditPhoneModal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const EditPhoneModal = ({ open, handleClose }) => {
  const [inviteFriend] = useInviteFriendMutation();

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
            Укажите ваш номер телефона
          </Typography>
          <FormaUpdatePhone />
        </Box>
      </Modal>
    </>,
    modalRoot,
  );
};

EditPhoneModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditPhoneModal;
