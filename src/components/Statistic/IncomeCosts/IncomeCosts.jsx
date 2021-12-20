import s from './IncomeCosts.module.scss';

const IncomeCosts = ({ income = '+ 45000,00 грн', costs = '- 18000.00 грн' }) => {
  return (
    <div className={s.incomeCosts}>
      {/*  */}
      <div className={s.costs}>
        <p className={s.incomeCosts__title}>Расходы:</p>
        <div className={s.incomeCosts__costs}>{costs}</div>
      </div>

      <div className={s.incoming}>
        <p className={s.incomeCosts__title}>Доходы:</p>
        <div className={s.incomeCosts__income}>{income}</div>
      </div>
    </div>
  );
};

export default IncomeCosts;
