// import { useState } from 'react';
// import { format, startOfMonth, endOfMonth } from 'date-fns';
import BackButton from './BackButton';
import Balance from './Balance';
// import PeriodRange from './Period';
import Period from './Period';
import s from './StatHeader.module.scss';

const StatHeader = ({ monthPick, newMonth, newYear }) => {
  // const [date, setDate] = useState(new Date());
  // const [startMonth, setStartMonth] = [format(startOfMonth(date), 'yyyy-MM-dd')];
  // const [endMonth, setEndMonth] = [format(endOfMonth(date), 'yyyy-MM-dd')];
  // const newMonth = date.toLocaleString('ru', { month: 'long' }).toUpperCase();
  // const newYear = date.getFullYear();

  // console.log(`1й день выбраного месяца(${newMonth}): ${startMonth}`);
  // console.log(`последний выбраного месяца(${newMonth}): ${endMonth}`);

  // const monthRangePicker = (currentDate, range) => {
  //   const newDate = currentDate.setMonth(currentDate.getMonth() + range);
  //   setDate(new Date(newDate));
  // };
  return (
    <div className={s.statHeader}>
      <div className={s.statHeader__wrapper}>
        <BackButton />
        <Period monthRangePicker={monthPick} month={newMonth} year={newYear} />
        <Balance />
      </div>

      {/* <PeriodRange /> */}
    </div>
  );
};

export default StatHeader;
