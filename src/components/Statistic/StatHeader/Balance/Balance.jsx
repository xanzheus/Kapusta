import s from './Balance.module.scss';

const Balance = ({ balance = 55000.0 }) => {
  return (
    <div className={s.balance}>
      <h2 className={s.balance__title}>Баланс:</h2>
      <div className={s.balance__amountBlock}>
        <div className={s.balance__amountSum}>{balance} UAH</div>
      </div>
      <a>
        <div className={s.balance__confirmButton}>Подтвердить</div>
      </a>
    </div>
  );
};

export default Balance;
