import { useGetTransactionsQuery } from '../../../../redux/service/transactionApi';
import s from './Balance.module.scss';

const Balance = () => {
  const { data = [], isLoading, isFetching } = useGetTransactionsQuery('2021-12-01', '2021-12-31');

  const balanceTotal = data => data.data.transactions[data.data.transactions.length - 1].balance;
  return (
    <div className={s.balance}>
      {/* {!isFetching && console.log(balanceTotal(data))} */}
      <h2 className={s.balance__title}>Баланс:</h2>
      <div className={s.balance__amountBlock}>
        <div className={s.balance__amountSum}>{!isFetching && balanceTotal(data)} UAH</div>
      </div>
      <div>
        <div className={s.balance__confirmButton}>Подтвердить</div>
      </div>
    </div>
  );
};

export default Balance;
