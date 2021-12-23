import StatHeader from '../../components/Statistic/StatHeader';
import IncomeCosts from '../../components/Statistic/IncomeCosts';
import GraphDetails from '../../components/Statistic/GraphDetails';
import { useState } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const StatisticPage = () => {
  const [date, setDate] = useState(new Date());
  const newMonth = date.toLocaleString('ru', { month: 'long' }).toUpperCase();
  const newYear = date.getFullYear();
  const startMonth = [format(startOfMonth(date), 'yyyy-MM-dd')];
  const endMonth = [format(endOfMonth(date), 'yyyy-MM-dd')];

  // console.log(`1й день выбраного месяца(${newMonth}): ${startMonth}`);
  // console.log(`последний выбраного месяца(${newMonth}): ${endMonth}`);

  const monthRangePicker = (currentDate, range) => {
    const newDate = currentDate.setMonth(currentDate.getMonth() + range);
    setDate(new Date(newDate));
  };
  return (
    <>
      <StatHeader monthPick={monthRangePicker} newMonth={newMonth} newYear={newYear} />
      <IncomeCosts startDate={startMonth} endDate={endMonth} />
      <GraphDetails startDate={startMonth} endDate={endMonth} />
    </>
  );
};

export default StatisticPage;
