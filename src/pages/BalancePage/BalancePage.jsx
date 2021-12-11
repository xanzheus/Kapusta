import HeaderTabs from 'components/BalanceTable/HeaderTabs';
import BalanceLine from 'components/BalanceTable/BalanceLine';
import style from '../BalancePage/BalancePage.module.scss';

const BalancePage = () => {
  return (
    <section className={style.balanceSection}>
      <BalanceLine />

      <HeaderTabs />
    </section>
  );
};

export default BalancePage;
