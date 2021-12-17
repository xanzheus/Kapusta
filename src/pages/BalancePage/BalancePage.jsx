import { useState } from 'react';
import { format, startOfMonth, startOfYear } from 'date-fns';
import Container from 'components/Container';
import HeaderTabs from 'components/BalanceTable/HeaderTabs';
import BalanceLine from 'components/BalanceTable/BalanceLine';
import style from '../BalancePage/BalancePage.module.scss';

const userBalance = {
  balance: 2500000,
  isStart: true,
};

const incomData = [
  {
    id: 111,
    date: '15.11.2021',
    comment: 'зарплата',
    category: 'ЗП',
    amount: 30000,
    type: 'income',
  },
  {
    id: 2,
    date: '01.11.2021',
    comment: 'аванс',
    category: 'ЗП',
    amount: 15000,
    type: 'income',
  },
];

const expensesData = [
  {
    id: 200,
    date: '20.01.2021',
    comment: 'ТО',
    category: 'Продукты',
    amount: -3500,
    type: 'expense',
  },
  {
    id: 202,
    date: '22.01.2021',
    comment: 'мясо',
    category: 'Продукты',
    amount: -200,
    type: 'expense',
  },
  {
    id: 203,
    date: '22.01.2021',
    comment: 'курица',
    category: 'Продукты',
    amount: -200,
    type: 'expense',
  },
  {
    id: 204,
    date: '22.01.2021',
    comment: 'олия',
    category: 'Продукты',
    amount: -64,
    type: 'expense',
  },
  {
    id: 205,
    date: '22.01.2021',
    comment: 'овощи',
    category: 'Продукты',
    amount: -200,
    type: 'expense',
  },
  {
    id: 206,
    date: '22.01.2021',
    comment: 'вода',
    category: 'Продукты',
    amount: -100,
    type: 'expense',
  },
  {
    id: 207,
    date: '22.01.2021',
    comment: 'вода',
    category: 'Продукты',
    amount: -100,
    type: 'expense',
  },
  {
    id: 208,
    date: '22.01.2021',
    comment: 'вода',
    category: 'Продукты',
    amount: -100,
    type: 'expense',
  },
  {
    id: 209,
    date: '22.01.2021',
    comment: 'вода',
    category: 'Продукты',
    amount: -100,
    type: 'expense',
  },
  {
    id: 210,
    date: '22.01.2021',
    comment: 'вода',
    category: 'Продукты',
    amount: -100,
    type: 'expense',
  },
];

const incomReportData = [
  {
    id: 234,
    month: 'Январь',
    totalsum: 30000,
  },
  {
    id: 235,
    month: 'Февраль',
    totalsum: 35000,
  },
];

const expensesReportData = [
  {
    id: 2322,
    month: 'Январь',
    totalsum: 20000,
  },
  {
    id: 23434,
    month: 'Февраль',
    totalsum: 25000,
  },

  {
    id: 2343444,
    month: 'Март',
    totalsum: 2000,
  },
];

const BalancePage = () => {
  const [date, setDate] = useState(() => new Date());

  const getCurrentDate = date => setDate(date);

  const firstOfMonth = format(startOfMonth(date), 'yyyy-MM-dd');
  const firstOfYear = format(startOfYear(date), 'yyyy-MM-dd');

  console.log(firstOfMonth);
  console.log(firstOfYear);

  return (
    <section className={style.balanceSection}>
      <Container>
        <BalanceLine userData={userBalance} />

        <HeaderTabs
          getCurrentDate={getCurrentDate}
          incomData={incomData}
          expensesData={expensesData}
          incomReportData={incomReportData}
          expensesReportData={expensesReportData}
        />
      </Container>
    </section>
  );
};

export default BalancePage;
