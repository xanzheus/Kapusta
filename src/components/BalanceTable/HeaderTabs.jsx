import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BalanceTable from 'components/BalanceTable/BalanceTable';
import Form from 'components/BalanceTable/Form';
import AddCategory from 'components/BalanceTable/AddCategory';
import style from './BalanceTable.module.scss';

const IncomData = [
  {
    id: 111,
    date: '15.11.2021',
    description: 'зарплата',
    category: 'ЗП',
    sum: 30000,
  },
  {
    id: 2,
    date: '01.11.2021',
    description: 'аванс',
    category: 'ЗП',
    sum: 15000,
  },
];

const expensesData = [
  {
    id: 200,
    date: '20.01.2021',
    description: 'ТО',
    category: 'Авто',
    sum: -3500,
  },
  {
    id: 202,
    date: '22.01.2021',
    description: 'мясо',
    category: 'Продукты',
    sum: -200,
  },
  {
    id: 203,
    date: '22.01.2021',
    description: 'курица',
    category: 'Продукты',
    sum: -200,
  },
  {
    id: 204,
    date: '22.01.2021',
    description: 'олия',
    category: 'Продукты',
    sum: -64,
  },
  {
    id: 205,
    date: '22.01.2021',
    description: 'овощи',
    category: 'Продукты',
    sum: -200,
  },
  {
    id: 206,
    date: '22.01.2021',
    description: 'вода',
    category: 'Продукты',
    sum: -100,
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
    totalsum: -20000,
  },
  {
    id: 23434,
    month: 'Февраль',
    totalsum: -25000,
  },
];

const incomeCatagoryArray = ['Зарплата', 'Инвистиции', 'Кредит'];

const ExpensesCatagoryArray = ['Продукты', 'Авто', 'Развлечения'];

const HeaderTabs = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className={style.tabs} label="Расход" value="1" />
            <Tab className={style.tabs} label="Доход" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Form
            placeholder={['Описание товара', 'Категория товара']}
            categoryArray={ExpensesCatagoryArray}
          />
          <BalanceTable
            data={expensesData}
            reportData={ExpensesReportData}
            category={ExpensesCatagoryArray}
          />
          <AddCategory categoryArray={ExpensesCatagoryArray} />
        </TabPanel>

        <TabPanel value="2">
          <Form
            placeholder={['Описание дохода', 'Категория дохода']}
            categoryArray={incomeCatagoryArray}
          />
          <BalanceTable
            data={IncomData}
            reportData={IncomReportData}
            category={incomeCatagoryArray}
          />
          <AddCategory categoryArray={incomeCatagoryArray} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default HeaderTabs;
