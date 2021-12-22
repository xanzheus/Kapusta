import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import FormaUpdatePhone from 'pages/ProfilePage/FormaUpdatePhone';
import style from './EditPhoneModal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const EditPhoneModal = ({ open, handleClose }) => {
  const [isOpen, setOpen] = useState(open);
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
          <FormaUpdatePhone setOpen={setOpen} />
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
