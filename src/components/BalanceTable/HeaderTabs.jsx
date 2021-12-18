import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { makeStyles } from '@material-ui/core';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BalanceTable from 'components/BalanceTable/BalanceTable';
import BalanceForm from 'components/BalanceTable/BalanceForm';
import COLORS from 'Constants/COLORS';
import { expensesCatagoryArray, incomeCatagoryArray } from 'Constants/category';
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

const HeaderTabs = ({
  getCurrentDate,
  incomData,
  expensesData,
  incomReportData,
  expensesReportData,
}) => {
  const [value, setValue] = useState('1');

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
            getCurrentDate={getCurrentDate}
            type="expense"
            placeholder={['Описание товара', 'Категория товара']}
            categoryArray={expensesCatagoryArray}
          />
          <BalanceTable
            Class="expenses"
            data={expensesData}
            reportData={expensesReportData}
            category={expensesCatagoryArray}
          />
        </TabPanel>

        <TabPanel className={classes.tabsThumb} value="2">
          <BalanceForm
            getCurrentDate={getCurrentDate}
            type="income"
            placeholder={['Описание дохода', 'Категория дохода']}
            categoryArray={incomeCatagoryArray}
          />
          <BalanceTable
            Class="income"
            data={incomData}
            reportData={incomReportData}
            category={incomeCatagoryArray}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

HeaderTabs.propTypes = {
  getCurrentDate: PropTypes.func.isRequired,
  incomData: PropTypes.array.isRequired,
  expensesData: PropTypes.array.isRequired,
  incomReportData: PropTypes.array.isRequired,
  expensesReportData: PropTypes.array.isRequired,
};

export default HeaderTabs;
