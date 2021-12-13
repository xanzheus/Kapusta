import Container from 'components/Container';
import HeaderTabs from 'components/BalanceTable/HeaderTabs';
import BalanceLine from 'components/BalanceTable/BalanceLine';
import style from '../BalancePage/BalancePage.module.scss';

const userBalance = {
  balance: 0,
  isStart: false,
};

const BalancePage = () => {
  return (
    <section className={style.balanceSection}>
      <Container>
        <BalanceLine userData={userBalance} />

        <HeaderTabs />
      </Container>
    </section>
  );
};

export default BalancePage;
