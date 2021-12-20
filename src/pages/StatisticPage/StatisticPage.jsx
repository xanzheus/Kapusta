import StatHeader from '../../components/Statistic/StatHeader';
import IncomeCosts from '../../components/Statistic/IncomeCosts';
import GraphDetails from '../../components/Statistic/GraphDetails';
// import Categories from '../Categories';
// import s from './StatisticPage.module.css';

const StatisticPage = () => {
  return (
    <>
      <StatHeader />
      <IncomeCosts />
      {/* <Categories /> */}
      <GraphDetails />
    </>
  );
};

export default StatisticPage;
