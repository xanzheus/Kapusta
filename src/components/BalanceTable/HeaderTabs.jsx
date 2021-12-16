import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { makeStyles } from '@material-ui/core';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BalanceTable from 'components/BalanceTable/BalanceTable';
import Form from 'components/BalanceTable/BalanceForm';
import COLORS from 'Constants/COLORSS';
import { expensesCatagoryArray, incomeCatagoryArray } from 'Constants/category';

const IncomData = [
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

const IncomReportData = [
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

const ExpensesReportData = [
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

const useStyles = makeStyles({
  tabs: {
    backgroundColor: '#fafbfd',
    borderRadius: '20px 20px 0 0',
    minWidth: '140px',
    minHeight: '40px',
    fontSize: '12px',
    lineHeight: '1.16',
    letterSpacing: '0.02em',
    fontWeight: '700',
    color: COLORS.mainDark,
    '&.Mui-selected': {
      color: COLORS.mainAccent,
      backgroundColor: '#fefefe',
    },
  },

  tabsline: {
    minHeight: '0',
  },

  tabsThumb: {
    padding: '35px 20px 60px 20px',
    background: COLORS.mainLight,
    boxShadow: '0px 10px 60px rgba(170, 178, 197, 0.2)',
    borderRadius: '0px 30px 30px 30px',
  },
});

const HeaderTabs = () => {
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
          <Form
            type="expense"
            placeholder={['Описание товара', 'Категория товара']}
            categoryArray={expensesCatagoryArray}
          />
          <BalanceTable
            Class="expenses"
            data={expensesData}
            reportData={ExpensesReportData}
            category={expensesCatagoryArray}
          />
        </TabPanel>

        <TabPanel className={classes.tabsThumb} value="2">
          <Form
            type="income"
            placeholder={['Описание дохода', 'Категория дохода']}
            categoryArray={incomeCatagoryArray}
          />
          <BalanceTable
            Class="income"
            data={IncomData}
            reportData={IncomReportData}
            category={incomeCatagoryArray}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default HeaderTabs;
