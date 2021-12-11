import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import Categories from './Categories';

import s from './GraphDetails.module.css';

drilldown(Highcharts);
//comment
//comment test
//РАСХОДЫ - ТЕСТ
const optionsCosts = {
  chart: {
    type: 'column',
  },

  title: {
    text: 'Расходы',
  },
  xAxis: {
    type: 'category',
  },
  legend: {
    enabled: false,
  },

  series: [
    {
      name: 'Категории',
      colorByPoint: true,
      data: [
        {
          name: 'ЗДОРОВЬЕ',
          y: 5,
          drilldown: 'health',
        },
        {
          name: 'ПРОДУКТЫ',
          y: 2,
          drilldown: 'meals',
        },
        {
          name: 'РАЗВЛЕЧЕНИЯ',
          y: 4,
          drilldown: 'entertainment',
        },
      ],
    },
  ],
  drilldown: {
    series: [
      {
        id: 'health',
        data: [
          ['Витамины', 400],
          ['Лекарства', 200],
          ['Массаж', 1000],
          ['Врачи', 2000],
        ],
      },
      {
        id: 'meals',
        data: [
          ['Apples', 40],
          ['Oranges', 20],
          ['Meat', 200],
          ['Fish', 150],
          ['Vegeatables', 2000],
        ],
      },
      {
        id: 'entertainment',
        data: [
          ['Баня', 4],
          ['Девки', 2],
          ['Компот', 2],
        ],
      },
    ],
  },
};

//ДОХОДЫ ТЕСТ
const optionsIncome = {
  chart: {
    type: 'column',
  },

  title: {
    text: 'Доходы',
  },
  xAxis: {
    type: 'category',
  },
  legend: {
    enabled: false,
  },

  series: [
    {
      name: 'Категории',
      colorByPoint: true,
      data: [
        {
          name: 'ЗП',
          y: 5,
          drilldown: 'salary',
        },
        {
          name: 'ДЕПОЗИТЫ',
          y: 2,
          drilldown: 'deposits',
        },
        {
          name: 'ПРОЧИЕ ДОХОДЫ',
          y: 4,
          drilldown: 'other',
        },
      ],
    },
  ],
  drilldown: {
    series: [
      {
        id: 'salary',
        data: [
          ['МУЖ', 500000],
          ['ЖЕНА', 20000],
          ['ДЕТИ', 1000],
        ],
      },
      {
        id: 'deposits',
        data: [
          ['PrivatBank', 400000],
          ['AlfaBank', 200000],
          ['OTPBank', 20000000],
        ],
      },
      {
        id: 'other',
        data: [
          ['Украдено', 10000],
          ['Найдено', 200000],
          ['Подарки', 2000],
        ],
      },
    ],
  },
};

const GraphDetails = () => {
  const [radioButton, setRadioButton] = useState(false);

  return (
    <div className={s.graphDetails}>
      <Categories updateData={setRadioButton} />
      {radioButton === false && <HighchartsReact highcharts={Highcharts} options={optionsCosts} />}
      {radioButton === true && <HighchartsReact highcharts={Highcharts} options={optionsIncome} />}
    </div>
  );
};

export default GraphDetails;
