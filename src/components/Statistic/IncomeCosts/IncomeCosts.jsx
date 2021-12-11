import s from './IncomeCosts.module.css';

const IncomeCosts = ({ income = '100$', costs = '88$' }) => {
  return (
    <div className={s.incomeCosts}>
      <div className={s.incoming}>Доходы: {income}</div>
      <div className={s.costs}>Расходы: {costs}</div>
    </div>
  );
};

export default IncomeCosts;
