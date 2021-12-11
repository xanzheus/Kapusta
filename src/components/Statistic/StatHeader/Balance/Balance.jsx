import s from './Balance.module.css';

const Balance = ({ balance = 1000000 }) => {
  return <div className={s.balance}>Баланс: {balance} $</div>;
};

export default Balance;
