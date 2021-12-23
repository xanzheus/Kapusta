import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { makeStyles } from '@material-ui/core';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BalanceTable from 'components/Balance/BalanceTable';
import BalanceForm from 'components/Balance/BalanceForm';
import COLORS from 'Constants/COLORS';
import {
  expensesCatagoryArray,
  incomeCatagoryArray,
  CATEGORYTYPE,
  TRANSLATE_CATEGORIES,
} from 'Constants/category';
import BREAKPOINTS from 'Constants/BREAKPOINTS';

const useStyles = makeStyles(theme => ({
  tabs: {
    backgroundColor: '#fafbfd',
    borderRadius: '20px 20px 0 0',
    minWidth: 140,
    minHeight: 40,
    fontSize: 12,
    lineHeight: 1.16,
    letterSpacing: '0.02em',
    fontWeight: 700,
    color: COLORS.mainDark,
    '&.Mui-selected': {
      color: COLORS.mainAccent,
      backgroundColor: '#fefefe',
    },
  },

  tabsline: {
    minHeight: 0,
  },

  tabsThumb: {
    padding: '35px 20px 50px 20px',
    background: COLORS.mainLight,
    boxShadow: '0px 10px 60px rgba(170, 178, 197, 0.2)',
    borderRadius: '0px 30px 30px 30px',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      padding: '30px 30px 60px 30px',
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      padding: '35px 20px 50px 20px',
    },
  },
}));

const HeaderTabs = ({ getCurrentDate, transactions, initialDate }) => {
  const [value, setValue] = useState('1');

  const refreshedTransactions = (symbol, type) => {
    const transactionsArr = transactions.slice(0, transactions.length - 1);

    return transactionsArr
      .map(item => {
        const dateStr = item?.date?.toString();
        const preparedDate = dateStr.slice(0, dateStr.indexOf('T'));
        const splitDate = preparedDate.split('-');
        const resultDate = `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`;

        return {
          id: item._id,
          date: resultDate,
          type: item.type,
          category: TRANSLATE_CATEGORIES[item.category],
          comment: item.comment,
          amount: `${symbol} ${item.amount.toFixed(2)} грн.`,
        };
      })
      .filter(item => item.type === type);
  };

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            className={classes.tabsline}
            TabIndicatorProps={{ style: { display: 'none' } }}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab className={classes.tabs} label="Расход" value="1" />
            <Tab className={classes.tabs} label="Доход" value="2" />
          </TabList>
        </Box>

        <TabPanel className={classes.tabsThumb} value="1">
          <BalanceForm
            initialDate={initialDate}
            getCurrentDate={getCurrentDate}
            type={CATEGORYTYPE.EXPENSE}
            placeholder={['Описание товара', 'Категория товара']}
            categoryArray={expensesCatagoryArray}
          />

          <BalanceTable
            initialDate={initialDate}
            Class="expenses"
            data={refreshedTransactions('-', CATEGORYTYPE.EXPENSE)}
            type={CATEGORYTYPE.EXPENSE}
            category={expensesCatagoryArray}
          />
        </TabPanel>

        <TabPanel className={classes.tabsThumb} value="2">
          <BalanceForm
            initialDate={initialDate}
            getCurrentDate={getCurrentDate}
            type={CATEGORYTYPE.INCOME}
            placeholder={['Описание дохода', 'Категория дохода']}
            categoryArray={incomeCatagoryArray}
          />

          <BalanceTable
            initialDate={initialDate}
            Class="income"
            data={refreshedTransactions('', CATEGORYTYPE.INCOME)}
            category={incomeCatagoryArray}
            type={CATEGORYTYPE.INCOME}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

HeaderTabs.propTypes = {
  getCurrentDate: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  initialDate: PropTypes.object.isRequired,
};

export default HeaderTabs;
