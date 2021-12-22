import s from './IncomeCosts.module.scss';
import { useGetCategoriesQuery } from '../../../redux/service/transactionApi';

const IncomeCosts = ({ startDate, endDate }) => {
  const { data = [], isSuccess } = useGetCategoriesQuery({ startDate, endDate });

  const getExpenseTotal = data => {
    const result = data
      .filter(exp => exp.type === 'expense')
      .reduce((prev, next) => prev + next.total, 0);
    return Number(result);
  };

  const getIncomeTotal = data => {
    const result = data
      .filter(exp => exp.type === 'income')
      .reduce((prev, next) => prev + next.total, 0);
    return Number(result);
  };

  return (
    <div className={s.incomeCosts}>
      {/*  */}
      <div className={s.costs}>
        <p className={s.incomeCosts__title}>Расходы:</p>
        <div className={s.incomeCosts__costs}>- {isSuccess && getExpenseTotal(data.data).toFixed(2)} грн.</div>
      </div>

      <div className={s.incoming}>
        <p className={s.incomeCosts__title}>Доходы:</p>
        <div className={s.incomeCosts__income}>{isSuccess && getIncomeTotal(data.data).toFixed(2)} грн.</div>
      </div>
    </div>
  );
};

export default IncomeCosts;
