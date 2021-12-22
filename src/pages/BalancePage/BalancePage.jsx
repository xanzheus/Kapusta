import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
// import { format, startOfMonth, startOfYear, lastDayOfMonth } from 'date-fns';
import { format, startOfMonth, lastDayOfMonth } from 'date-fns';
import { useMediaPredicate } from 'react-media-hook';
import Container from 'components/Container';
import HeaderTabs from 'components/Balance/HeaderTabs';
import BalanceLine from 'components/Balance/BalanceLine';
import MobilePage from 'components/Balance/Mobile/MobilePage';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import { useGetTransactionsQuery } from 'redux/service/transactionApi';

const useStyles = makeStyles(theme => ({
  balanceSection: {
    maxWidth: BREAKPOINTS.mobile,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      maxWidth: BREAKPOINTS.tablet,
      padding: '40px 0 280px 0',
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      maxWidth: BREAKPOINTS.desktop,
      padding: '40px 0 80px 0',
    },
  },
}));

// const userBalance = {
//   balance: 1000000,
//   isStart: true,
// };

// const incomData = [
//   {
//     id: 111,
//     date: '15.11.2021',
//     comment: 'зарплата',
//     category: 'ЗП',
//     amount: '30 000.00 грн.',
//     type: 'income',
//   },
//   {
//     id: 2,
//     date: '01.11.2021',
//     comment: 'аванс',
//     category: 'ЗП',
//     amount: '15 000.00 грн.',
//     type: 'income',
//   },
// ];

// const expensesData = [
//   {
//     id: 200,
//     date: '20.01.2021',
//     comment: 'ТО',
//     category: 'Продукты',
//     amount: '- 3 500.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 202,
//     date: '22.01.2021',
//     comment: 'мясо',
//     category: 'Продукты',
//     amount: '- 200.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 203,
//     date: '22.01.2021',
//     comment: 'курица',
//     category: 'Продукты',
//     amount: '- 200.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 204,
//     date: '22.01.2021',
//     comment: 'олия',
//     category: 'Продукты',
//     amount: '- 64.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 205,
//     date: '22.01.2021',
//     comment: 'овощи',
//     category: 'Продукты',
//     amount: '- 200.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 206,
//     date: '22.01.2021',
//     comment: 'вода',
//     category: 'Продукты',
//     amount: '- 100.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 207,
//     date: '22.01.2021',
//     comment: 'вода',
//     category: 'Продукты',
//     amount: '- 100.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 208,
//     date: '22.01.2021',
//     comment: 'вода',
//     category: 'Продукты',
//     amount: '- 100.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 209,
//     date: '22.01.2021',
//     comment: 'вода',
//     category: 'Продукты',
//     amount: '- 100.00 грн.',
//     type: 'expense',
//   },
//   {
//     id: 210,
//     date: '22.01.2021',
//     comment: 'вода',
//     category: 'Продукты',
//     amount: '- 100.00 грн.',
//     type: 'expense',
//   },
// ];

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

  const classes = useStyles();

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  const getCurrentDate = date => setDate(date);

  const firstOfMonth = format(startOfMonth(date), 'yyyy-MM-dd');
  const lastOfMonth = format(lastDayOfMonth(date), 'yyyy-MM-dd');

  // const firstOfYear = format(startOfYear(date), 'yyyy-MM-dd');

  const { data, isFetching } = useGetTransactionsQuery(firstOfMonth, lastOfMonth);

  // console.log(firstOfYear);

  return (
    <section className={classes.balanceSection}>
      <Container>
        {small && (
          <>
            {!isFetching && (
              <MobilePage
                getCurrentDate={getCurrentDate}
                userData={data.data?.transactions.find(item => item.balance)}
                transactionsData={data.data?.transactions}
              />
            )}
          </>
        )}

        {medium && (
          <>
            {!isFetching && (
              <>
                <BalanceLine userData={data.data?.transactions.find(item => item.balance)} />

                <HeaderTabs
                  getCurrentDate={getCurrentDate}
                  transactions={data.data?.transactions}
                  incomReportData={incomReportData}
                  expensesReportData={expensesReportData}
                />
              </>
            )}
          </>
        )}

        {large && (
          <>
            {!isFetching && (
              <>
                <BalanceLine userData={data.data?.transactions.find(item => item.balance)} />

                <HeaderTabs
                  isFetching={isFetching}
                  getCurrentDate={getCurrentDate}
                  transactions={data.data?.transactions}
                  incomReportData={incomReportData}
                  expensesReportData={expensesReportData}
                />
              </>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default BalancePage;
