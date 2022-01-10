import PropTypes from 'prop-types';
import style from './Button.module.scss';

const ButtonGoogle = ({ name, variant, borderType, children }) => (
  <a
    href="https://adamants-wallet-project-back.herokuapp.com/api/auth/google"
    className={[style.main__button, style[variant], style[borderType]].join(' ')}
  >
    {children}
    {name}
  </a>
);

ButtonGoogle.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  borderType: PropTypes.string,
};

export default ButtonGoogle;
