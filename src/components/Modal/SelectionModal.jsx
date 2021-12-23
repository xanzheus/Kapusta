import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from 'components/Button';
import CancelIcon from '@mui/icons-material/Close';
import style from './SelectionModal.module.scss';

// LOCALISE
import { useTranslation } from 'react-i18next';

const modalRoot = document.querySelector('#modal-root');

const SelectionModal = ({ open, handleClose, onClick }) => {
  // LOCALISE
  const { t } = useTranslation();
  return createPortal(
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={style.modal}>
          <CancelIcon className={style.modal__close_button} onClick={handleClose} />
          <Typography className={style.modal__title} id="keep-mounted-modal-title" mt={6} mb={2}>
            {t('modal.sure')}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
            <Button type="button" name={t('modal.yes')} onClick={onClick} />
            <Button type="button" name={t('modal.no')} onClick={handleClose} />
          </Stack>
        </Box>
      </Modal>
    </>,
    modalRoot,
  );
};

SelectionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SelectionModal;
