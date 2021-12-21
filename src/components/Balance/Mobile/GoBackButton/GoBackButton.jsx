import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  goBackButton: {
    backgroundColor: 'transparent',
    border: 'none',
    marginBottom: 15,
  },
});

const GoBackButton = ({ toggleForm }) => {
  const classes = useStyles();
  return (
    <button className={classes.goBackButton} onClick={toggleForm}>
      <svg
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#FF751D" />
      </svg>
    </button>
  );
};

GoBackButton.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default GoBackButton;
