import BackButton from './BackButton';
import Balance from './Balance';
import Period from './Period';
import s from './StatHeader.module.css';

const StatHeader = () => {
  return (
    <div className={s.statHeader}>
      <BackButton />
      <Balance />
      <Period />
    </div>
  );
};

export default StatHeader;
