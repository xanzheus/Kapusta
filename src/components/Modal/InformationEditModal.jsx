import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Close';
import style from './SelectionModal.module.scss';
// LOCALISE
import { useTranslation } from 'react-i18next';

const modalRoot = document.querySelector('#modal-root');

const InformationEditModal = ({ open, handleClose }) => {
  // LOCALISE
  const { t } = useTranslation();
  return createPortal(
    <Box>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={style.modal}>
          <CancelIcon className={style.modal__close_button} onClick={handleClose} />
          <Typography color="#ff751d" mt={6} id="keep-mounted-modal-title" variant="h4">
            {t('modal.editTitle')}
          </Typography>

          <Typography pl={6} pr={6} id="modal-modal-description" mt={3} variant="h6" mb={6}>
            {t('modal.edit')}
          </Typography>
        </Box>
      </Modal>
    </Box>,
    modalRoot,
  );
};

InformationEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default InformationEditModal;
