import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
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

const BalancePage = () => {
  const [date, setDate] = useState(() => new Date());

  const classes = useStyles();

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  const getCurrentDate = date => setDate(date);

  const firstOfMonth = format(startOfMonth(date), 'yyyy-MM-dd');
  const lastOfMonth = format(lastDayOfMonth(date), 'yyyy-MM-dd');

  const { data, isSuccess } = useGetTransactionsQuery({
    startDate: firstOfMonth,
    endDate: lastOfMonth,
  });

  return (
    <section className={classes.balanceSection}>
      <Container>
        {small && (
          <>
            {isSuccess && (
              <MobilePage
                initialDate={date}
                getCurrentDate={getCurrentDate}
                userData={data?.data?.transactions}
                transactionsData={data.data?.transactions}
              />
            )}
          </>
        )}

        {medium && (
          <>
            {isSuccess && (
              <>
                <BalanceLine userData={data?.data?.transactions} />

                <HeaderTabs
                  initialDate={date}
                  getCurrentDate={getCurrentDate}
                  transactions={data?.data?.transactions}
                />
              </>
            )}
          </>
        )}

        {large && (
          <>
            {isSuccess && (
              <>
                <BalanceLine userData={data?.data?.transactions} />

                <HeaderTabs
                  initialDate={date}
                  getCurrentDate={getCurrentDate}
                  transactions={data?.data?.transactions}
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
