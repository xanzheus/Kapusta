import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// import Categories from './Categories';
import CategoriesRTK from './CategoriesRTK';
import { useGetCategoriesQuery } from '../../../redux/service/getReportsData';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import s from './GraphDetails.module.scss';

const GraphDetails = () => {
  const [resultValue, setResultValue] = useState('РАСХОДЫ');
  const [isActive, setisActive] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');
  const { data = [] } = useGetCategoriesQuery();
  const [diagramType, setDiagramType] = useState('column');
  const [windowSize, setWindowSize] = useState(window.outerWidth);

  // console.log(diagramType);
  // ФУНКЦИЯ Установка в стейт значения текущего width экрана
  const handleResize = () => {
    setWindowSize(window.outerWidth);
  };
  // console.log(windowSize);
  // ФУНКЦИЯ Установка в стейт тип диаграммы для разных устройств
  const handlerDiagramType = () => {
    if (windowSize < 321) {
      setDiagramType('bar');
    }
    if (windowSize > 320) {
      setDiagramType('column');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    handlerDiagramType();
  }, [windowSize]);

  // Функция вывода детелей расходов или доходов выбраной категории
  const sortCategoryDetails = () => {
    const detailsArrayKeys = [];
    const detailsArrayValues = [];

    const selectedCat = data.filter(item => {
      return item.name === selectedCategory;
    });

    selectedCat.map(item => {
      Object.keys(item.details).map(i => {
        detailsArrayKeys.push(i);
      });
    });

    selectedCat.map(item => {
      Object.values(item.details).map(i => {
        detailsArrayValues.push(i);
      });
    });

    const detailsArray = detailsArrayKeys.map((item, index) => {
      return {
        name: item,
        y: detailsArrayValues[index],
      };
    });

    return detailsArray;
  };

  // Опции диаграммы
  const options = {
    chart: {
      type: diagramType,
      // type: pie, column, bar,
      // options3d: {
      //   enabled: true,
      //   alpha: 45,
      // },
    },

    title: {
      text: '',
      // text: 'Расходы',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: -40,
          // rotation: 40,
          style: {
            textOverflow: 'ellipsis',
            rotate: 42,
          },
        },
      },
    },

    responsive: {},

    series: [
      {
        name: 'Категории',
        colorByPoint: true,
        data: sortCategoryDetails(),
        // keys: ['y', 'name'],
      },
    ],
  };

  return (
    <div className={s.graphDetails}>
      {/* <Categories updateData={setResultValue} setActiveCalss={setisActive} /> */}
      <CategoriesRTK
        updateData={setResultValue}
        setActiveCalss={setisActive}
        setCategory={setselectedCategory}
        setDiagramType={setDiagramType}
      />
      <div className={isActive === false ? s.diagramLarge : s.diagram}>
        {isActive === false && <h2 className={s.diagram_emptyTitle}>Выберите категорию</h2>}
        {isActive === true && (
          <div className={s.diagram__toggle}>
            <button onClick={() => setDiagramType('pie')} className={s.diagram__buttonPie}>
              <PieChartIcon />
            </button>
            <button onClick={() => setDiagramType('column')} className={s.diagram__buttonColumn}>
              <BarChartIcon />
            </button>
            <button onClick={() => setDiagramType('bar')} className={s.diagram__buttonBar}>
              <BarChartIcon />
            </button>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default GraphDetails;
