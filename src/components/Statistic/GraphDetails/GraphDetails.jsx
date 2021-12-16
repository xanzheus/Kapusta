import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Categories from './Categories';
import s from './GraphDetails.module.scss';

const costDetails = [
  { name: 'meat', id: 1, y: 652 },
  { name: 'fish', id: 2, y: 420 },
  { name: 'apple', id: 3, y: 52 },
  { name: 'pineapple', id: 4, y: 8 },
  { name: 'mango', id: 5, y: 45 },
  { name: 'kivi', id: 6, y: 555 },
];

const options = {
  chart: {
    type: 'column',
  },

  title: {
    text: '',
    // text: 'Расходы',
  },
  xAxis: {
    type: 'category',
  },
  legend: {
    enabled: false,
  },

  responsive: {},

  series: [
    {
      name: 'Категории',
      colorByPoint: true,
      data: costDetails,
    },
  ],
};

const GraphDetails = () => {
  const [resultValue, setResultValue] = useState('РАСХОДЫ');
  const [isActive, setisActive] = useState(false);

  return (
    <div className={s.graphDetails}>
      <Categories updateData={setResultValue} setActiveCalss={setisActive} />

      <div className={s.diagram}>
        {isActive === false && <h2 className={s.diagram_emptyTitle}>Выберите категорию</h2>}
        {isActive === true && <HighchartsReact highcharts={Highcharts} options={options} />}
      </div>
      <div></div>
    </div>
  );
};

export default GraphDetails;
