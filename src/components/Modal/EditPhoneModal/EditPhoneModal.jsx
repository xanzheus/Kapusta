import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Close';
import FormaUpdatePhone from 'pages/ProfilePage/FormaUpdatePhone';
import style from './EditPhoneModal.module.scss';

// LOCALISE
import { useTranslation } from 'react-i18next';

const modalRoot = document.querySelector('#modal-root');

const EditPhoneModal = ({ toggleOpen, open }) => {
  // LOCALISE
  const { t } = useTranslation();
  return createPortal(
    <>
      <Modal
        keepMounted
        open={open}
        onClose={toggleOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={style.modal}>
          <CancelIcon className={style.modal__close_button} onClick={toggleOpen} />
          <Typography className={style.modal__title} id="keep-mounted-modal-title" mt={6} mb={2}>
            {t('modal.phone')}
          </Typography>
          <FormaUpdatePhone toggleOpen={toggleOpen} />
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
