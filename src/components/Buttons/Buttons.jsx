import PropTypes from 'prop-types';
// import Stack from '@mui/material/Stack';
import style from './Buttons.module.scss';

// const BalanceFormButtons = ({ name, type, onClick }) => {
//   return (
//     <Stack spacing={2} direction="row">
//       <button className={style.main__button} type={type[0]}>
//         {name[0]}
//       </button>
//       <button className={style.main__button} onClick={onClick} type={type[1]}>
//         {name[1]}
//       </button>
//     </Stack>
//   );
// };

const Button = ({ name, type, onClick, disabled = false }) => (
  <button className={style.main__button} onClick={onClick} type={type} disabled={disabled}>
    {name}
  </button>
);

// BalanceFormButtons.propTypes = {
//   name: PropTypes.array.isRequired,
//   type: PropTypes.array.isRequired,
//   onClick: PropTypes.func,
// };

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
