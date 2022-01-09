import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import backGround from 'images/bgc-grey-m.png';

const useStyles = makeStyles({
  modal: {
    minWidth: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '10px 10px 30px rgba(82, 85, 95, 0.4)',
    borderRadius: '16px 16px 16px 0',
    padding: '10px 15px',
    border: 'none',
    minHeight: '99vh',
    outline: 'none',

    backgroundImage: `url(${backGround})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top -5px center',
  },
});

const EditModal = ({ openEditModal, toggleEditForm, children }) => {
  const modalRoot = document.querySelector('#modal-root');

  const classes = useStyles();

  return createPortal(
    <Modal
      open={openEditModal}
      onClose={toggleEditForm}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box className={classes.modal}>{children}</Box>
    </Modal>,

    modalRoot,
  );
};

EditModal.propTypes = {
  children: PropTypes.node,
  openEditModal: PropTypes.bool.isRequired,
  toggleEditForm: PropTypes.func.isRequired,
};

export default EditModal;
