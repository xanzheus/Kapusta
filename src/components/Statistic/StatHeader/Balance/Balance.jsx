import { useGetTransactionsQuery } from '../../../../redux/service/transactionApi';
import { useGetDataUserQuery } from '../../../../redux/service/userAPI';
import s from './Balance.module.scss';

const Balance = () => {
  const { data = [], isSuccess } = useGetTransactionsQuery('2000-12-01', '2200-12-31');
  const { data:dataCurrency, isFetching } = useGetDataUserQuery();

  const getBalanceTotal = data => data.data.transactions[data.data.transactions.length - 1].balance;

  const currency = data => data.data.user.settings.currency
  
  return (
    <div className={s.balance}>
      {/* {isSuccess && console.log(balanceTotal(data))} */}
      <h2 className={s.balance__title}>Баланс:</h2>
      <div className={s.balance__amountBlock}>
        <div className={s.balance__amountSum}>
          {!isFetching && console.log(dataCurrency)}
          {isSuccess && getBalanceTotal(data).toFixed(2)} {!isFetching && currency(dataCurrency)}
        </div>
      </div>
      <div>
        <div className={s.balance__confirmButton}>Подтвердить</div>
      </div>
    </div>
  );
};

export default Balance;
