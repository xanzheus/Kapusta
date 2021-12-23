import BackButton from './BackButton';
import Balance from './Balance';
import Period from './Period';
import s from './StatHeader.module.scss';

const StatHeader = ({ monthPick, newMonth, newYear }) => {
  return (
    <div className={s.statHeader}>
      <div className={s.statHeader__wrapper}>
        <BackButton />
        <Period monthRangePicker={monthPick} month={newMonth} year={newYear} />
        <Balance />
      </div>
    </div>
  );
};

export default StatHeader;
