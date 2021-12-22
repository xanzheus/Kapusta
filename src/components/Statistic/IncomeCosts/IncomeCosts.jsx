import { useState } from 'react';
import s from './IncomeCosts.module.scss';
import { useGetCategoriesQuery } from '../../../redux/service/transactionApi';

const IncomeCosts = ({ startDate, endDate }) => {
  const { data = [], isLoading, isFetching } = useGetCategoriesQuery({ startDate, endDate });

  const getExpenseTotal = data => {
    const result = data
      .filter(exp => exp.type === 'expense')
      .reduce((prev, next) => prev + next.total, 0);
    return result;
  };

  const getIncomeTotal = data => {
    const result = data
      .filter(exp => exp.type === 'income')
      .reduce((prev, next) => prev + next.total, 0);
    return result;
  };

  return (
    <div className={s.incomeCosts}>
      {!isFetching && console.log(data.data)}
      {/*  */}
      <div className={s.costs}>
        <p className={s.incomeCosts__title}>Расходы:</p>
        <div className={s.incomeCosts__costs}>{!isFetching && -getExpenseTotal(data.data)}</div>
      </div>

      <div className={s.incoming}>
        <p className={s.incomeCosts__title}>Доходы:</p>
        <div className={s.incomeCosts__income}>{!isFetching && getIncomeTotal(data.data)}</div>
      </div>
    </div>
  );
};

export default IncomeCosts;
