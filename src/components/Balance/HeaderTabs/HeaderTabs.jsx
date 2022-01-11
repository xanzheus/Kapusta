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
import { CATEGORYTYPE } from 'Constants/category';
import BREAKPOINTS from 'Constants/BREAKPOINTS';

// LOCALISE
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  tabsList: {
    '&.css-18acmos-MuiTabs-root': {
      minHeight: 40,
    },
  },

  tabs: {
    '&.css-1m35abl-MuiButtonBase-root-MuiTab-root': {
      backgroundColor: '#fafbfd',
      borderRadius: '20px 20px 0 0',
      minWidth: 140,
      fontSize: 12,
      minHeight: 40,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      fontWeight: 700,
      color: COLORS.mainDark,
    },

    '&.css-18acmos-MuiTabs-root': {
      minHeight: 40,
    },

    '&.css-1m35abl-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: COLORS.mainAccent,
      backgroundColor: '#fefefe',
    },
  },

  tabsThumb: {
    '&.css-13xfq8m-MuiTabPanel-root': {
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
  },
}));

const HeaderTabs = ({ getCurrentDate, transactions, initialDate }) => {
  // LOCALISE
  const { t } = useTranslation();
  const TRANSLATE_CATEGORIES = t('catagories', { returnObjects: true });
  const incomeCatagoryArray = t('incomeCatagoryArray', { returnObjects: true });

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

  const expensesCatagoryArray = t('expensesCatagoryArray', { returnObjects: true });
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            className={classes.tabsList}
            TabIndicatorProps={{ style: { display: 'none' } }}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab className={classes.tabs} label={t('headersTabs.consumption')} value="1" />
            <Tab className={classes.tabs} label={t('headersTabs.income')} value="2" />
          </TabList>
        </Box>

        <TabPanel className={classes.tabsThumb} value="1">
          <BalanceForm
            initialDate={initialDate}
            getCurrentDate={getCurrentDate}
            type={CATEGORYTYPE.EXPENSE}
            placeholder={[t('headersTabs.productDescription'), t('headersTabs.productCategory')]}
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
            placeholder={[t('headersTabs.descriptionIncome'), t('headersTabs.incomeCategory')]}
            categoryArray={incomeCatagoryArray}
          />

          <BalanceTable
            initialDate={initialDate}
            Class="income"
            data={refreshedTransactions(' ', CATEGORYTYPE.INCOME)}
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
