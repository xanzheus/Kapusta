import { Link } from 'react-router-dom';
import style from './BalanceTable.module.scss';

const BalanceLine = () => {
  const totalUserBalance = { user: 'hc99yhf', totalBalance: 100000 };
  const { totalBalance } = totalUserBalance;
  return (
    <div className={style.balanceline__Thumb}>
      <p>
        Текущий баланс пользователя: <b>{totalBalance} грн</b>
      </p>
      <Link className={style.reports__link} to="/reports">
        перейти к отчётам
      </Link>
    </div>
  );
};

export default BalanceLine;
