import { useState } from 'react';
import PropTypes from 'prop-types';
import { useGetCategoriesQuery } from '../../../../redux/service/transactionApi';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import sprite from '../../../../images/svg/sprite.svg';
import s from './CategoriesRTK.module.scss';

const CategoriesQuery = ({ updateData, setActiveCalss, setCategory, startDate, endDate }) => {
  const [value, setValue] = useState('expense');
  // const [selectedCategory, setselectedCategory] = useState('');

  const { data = [], isLoading } = useGetCategoriesQuery();
  // const { data = [], isLoading } = useGetCategoriesQuery(startDate, endDate);

  // console.log(data);
  // const newData = data.data;
  // console.log(newData);

  const newDDD = data.map(p => (p.category === 'products' ? { ...p, category: 'Продукты' } : p));
  console.log(newDDD);

  const EXPENSE_CATEGORIES = [
    { PRODUCTS: 'products' },
    { ALCOHOL: 'alcohol' },
    { ENTERTAINMENT: 'entertainment' },
    { HEALTHY: 'healthy' },
    { TRANSPORT: 'transport' },
    { HOME: 'home' },
    { TECHNIC: 'technic' },
    { COMMUNICATION: 'communication' },
    { HOBBY: 'hobby' },
    { EDUCATION: 'education' },
    { OTHER: 'other' },
  ];

  const EXPENSE_CATEGORIES_RU = [
    { PRODUCTS: 'ПРОДУКТЫ' },
    { ALCOHOL: 'АЛКОГОЛЬ' },
    { ENTERTAINMENT: 'РАЗВЛЕЧЕНИУ' },
    { HEALTHY: 'ЗДОРОВЬЕ' },
    { TRANSPORT: 'ТРАНСПОРТ' },
    { HOME: 'ВСЕ ДЛЯ ДОМА' },
    { TECHNIC: 'ТЕХНКА' },
    { COMMUNICATION: 'КОМУНАЛКА, СВЯЗЬ' },
    { HOBBY: 'СПОРТ, ХОББИ' },
    { EDUCATION: 'ОБРАЗОВАНИЕ' },
    { OTHER: 'ПРОЧЕЕ' },
  ];

  // let newData = [];
  // if ('data' in data) {
  //   const { transactions } = data.data;
  //   transactions.forEach(el => console.log(el));
  //   console.log(transactions);
  //   newData = [...transactions];
  // }

  // ************** Функция сортировки только РАСХОДЫ(ДОХОДЫ)
  const sortCategoryValues = type => {
    const newCat = data.filter(category => {
      return category.type === type;
    });
    return newCat;
  };

  // ************** Функция изменения данных в стейт РАСХОДЫ-ДОХОДЫ
  const resultValue = () => {
    if (value === 'expense') {
      setValue('income');
    }
    if (value === 'income') {
      setValue('expense');
    }
  };

  return (
    <div className={s.categories}>
      <div className={s.categories__select}>
        <button
          className={s.search__buttonPickerBack}
          onClick={() => {
            resultValue();
            setActiveCalss(false);
          }}
        ></button>
        <div
          onChange={() => {
            updateData(value);
          }}
          className={s.categories__currentValue}
        >
          {value === 'expense' ? 'Расходы' : 'Доходы'}
        </div>

        <button
          className={s.search__buttonPickerNext}
          onClick={() => {
            resultValue();

            setActiveCalss(false);
          }}
        ></button>
      </div>

      {isLoading ? (
        <div className={s.categories__loader}>
          <Stack sx={{ color: 'grey.500' }}>
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      ) : (
        <div className={s.income}>
          <div className={s.categories__listItems}>
            <ul className={s.categorie__list}>
              {sortCategoryValues(value).map(item => {
                return (
                  <li
                    className={s.categorie__items}
                    data-name={item.category}
                    key={item.category}
                    onClick={e => {
                      // setselectedCategory(e.currentTarget.getAttribute('data-name'));
                      setCategory(e.currentTarget.getAttribute('data-name'));
                      setActiveCalss(true);
                    }}
                  >
                    <div className={s.categorie__link}>
                      {item.total}

                      {/* <svg className={isActive ? s.icon : s.iconActive}> */}
                      <svg className={s.icon}>
                        <use xlinkHref={`${sprite}#${item.category}`} />
                      </svg>

                      <p className={s.categorie__name}>{item.category}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* <Stack sx={{ color: 'grey.500' }}>
        <CircularProgress color="inherit" />
      </Stack> */}
    </div>
  );
};
CategoriesQuery.propTypes = {
  updateData: PropTypes.func,
};
export default CategoriesQuery;
