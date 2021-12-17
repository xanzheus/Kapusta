import BackButton from './BackButton';
import Balance from './Balance';
// import PeriodRange from './Period';
import Period from './Period';
import s from './StatHeader.module.scss';

const StatHeader = () => {
  return (
    <div className={s.statHeader}>
      <div className={s.statHeader__wrapper}>
        <BackButton />
        <Period />
        <Balance />
      </div>

      {/* <PeriodRange /> */}
    </div>
  );
};

export default StatHeader;
