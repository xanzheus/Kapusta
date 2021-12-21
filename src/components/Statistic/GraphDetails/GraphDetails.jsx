import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// import Categories from './Categories';
import CategoriesRTK from './CategoriesRTK';
import { useGetCategoriesQuery } from '../../../redux/service/transactionApi';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import s from './GraphDetails.module.scss';

const GraphDetails = ({ startDate, endDate }) => {
  // const [resultValue, setResultValue] = useState('РАСХОДЫ');
  const [isActive, setisActive] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');
  // const { data = [] } = useGetCategoriesQuery();
  const { data = [] } = useGetCategoriesQuery({ startDate, endDate });
  const [diagramType, setDiagramType] = useState('column');
  const [windowSize, setWindowSize] = useState(window.outerWidth);

  // if ('data' in data) {
  //   const newData = data.data;
  //   console.log(newData);
  // }

  const dataTranslated = val => {
    const newOb = val.map(i => {
      if (i.category === 'products') {
        return { ...i, category: 'Продукты' };
      }
      if (i.category === 'home') {
        return { ...i, category: 'Всё для дома' };
      }
      if (i.category === 'entertainment') {
        return { ...i, category: 'Развлечения' };
      }
      if (i.category === 'healthy') {
        return { ...i, category: 'Здоровье' };
      }
      if (i.category === 'transport') {
        return { ...i, category: 'Транспорт' };
      }
      if (i.category === 'technic') {
        return { ...i, category: 'Техника' };
      }
      if (i.category === 'communication') {
        return { ...i, category: 'Комуналка, связь' };
      }
      if (i.category === 'hobby') {
        return { ...i, category: 'Спорт, хобби' };
      }
      if (i.category === 'education') {
        return { ...i, category: 'Образование' };
      }
      if (i.category === 'other') {
        return { ...i, category: 'Прочее' };
      }
      if (i.category === 'salary') {
        return { ...i, category: 'ЗП' };
      }
      if (i.category === 'additional') {
        return { ...i, category: 'Доп.доход' };
      }
    });
    return newOb;
  };

  // ФУНКЦИЯ Установка в стейт значения текущего width экрана
  const handleResize = () => {
    setWindowSize(window.outerWidth);
  };

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
  const sortCategoryDetails = data => {
    const detailsArrayKeys = [];
    const detailsArrayValues = [];

    const selectedCat = dataTranslated(data.data).filter(item => {
      return item.category === selectedCategory;
    });

    selectedCat.map(item => {
      return Object.keys(item.details).map(i => {
        return detailsArrayKeys.push(i);
      });
    });

    selectedCat.map(item => {
      return Object.values(item.details).map(i => {
        return detailsArrayValues.push(i);
      });
    });

    const detailsArray = detailsArrayKeys.map((item, index) => {
      return {
        name: item,
        y: detailsArrayValues[index],
      };
    });
    console.log(detailsArrayKeys);
    return detailsArray;
  };

  // Опции диаграммы
  const options = data => {
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
          data: sortCategoryDetails(data),
          // keys: ['y', 'name'],
        },
      ],
    };
    return options;
  };

  return (
    // <></>
    <div className={s.graphDetails}>
      {/* <Categories updateData={setResultValue} setActiveCalss={setisActive} /> */}
      <CategoriesRTK
        // updateData={setResultValue}
        setActiveCalss={setisActive}
        setCategory={setselectedCategory}
        setDiagramType={setDiagramType}
        startDate={startDate}
        endDate={endDate}
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
            <HighchartsReact highcharts={Highcharts} options={options(data)} />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default GraphDetails;
