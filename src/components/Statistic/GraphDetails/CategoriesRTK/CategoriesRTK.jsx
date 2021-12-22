import { useState } from 'react';
import PropTypes from 'prop-types';
import { useGetCategoriesQuery } from '../../../../redux/service/transactionApi';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import sprite from '../../../../images/svg/sprite.svg';
import s from './CategoriesRTK.module.scss';

const CategoriesQuery = ({ updateData, setActiveCalss, setCategory, startDate, endDate }) => {
  const { data = [], isLoading, isFetching } = useGetCategoriesQuery({ startDate, endDate });
  const [value, setValue] = useState('expense');

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
      if (i.category === 'alcohol') {
        return { ...i, category: 'Алкоголь' };
      }
      if (i.category === 'technic') {
        return { ...i, category: 'Техника' };
      }
      if (i.category === 'communication') {
        return { ...i, category: 'Коммуналка, связь' };
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

  // const EXPENSE_CATEGORIES = [
  //   { PRODUCTS: 'products' },
  //   { ALCOHOL: 'alcohol' },
  //   { ENTERTAINMENT: 'entertainment' },
  //   { HEALTHY: 'healthy' },
  //   { TRANSPORT: 'transport' },
  //   { HOME: 'home' },
  //   { TECHNIC: 'technic' },
  //   { COMMUNICATION: 'communication' },
  //   { HOBBY: 'hobby' },
  //   { EDUCATION: 'education' },
  //   { OTHER: 'other' },
  // ];

  // const EXPENSE_CATEGORIES_RU = [
  //   { PRODUCTS: 'Продукты' },
  //   { ALCOHOL: 'Алкоголь' },
  //   { ENTERTAINMENT: 'Развлечения' },
  //   { HEALTHY: 'Здоровье' },
  //   { TRANSPORT: 'Транспорт' },
  //   { HOME: 'Все для дома' },
  //   { TECHNIC: 'Техника' },
  //   { COMMUNICATION: 'Коммуналка, связь' },
  //   { HOBBY: 'Спорт, хобби' },
  //   { EDUCATION: 'Образование' },
  //   { OTHER: 'Прочее' },
  // ];

  // ************** Функция сортировки только РАСХОДЫ(ДОХОДЫ)
  const sortCategoryValues = (type, value) => {
    // const newCat = data.data.filter(category => {
    console.log(value);
    const newCat = value.filter(category => {
      return category.type === type;
    });
    console.log(newCat);
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
      {console.log(data.data)}
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
      {isLoading && (
        <div className={s.categories__loader}>
          <Stack sx={{ color: 'grey.500' }}>
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}{' '}
      {!isFetching && (
        <div className={s.income}>
          <div className={s.categories__listItems}>
            <ul className={s.categorie__list}>
              {console.log(data)}
              {sortCategoryValues(value, dataTranslated(data.data)).map(item => {
                return (
                  <li
                    className={s.categorie__items}
                    data-name={item.category}
                    key={item.category}
                    onClick={e => {
                      setCategory(e.currentTarget.getAttribute('data-name'));
                      setActiveCalss(true);
                    }}
                  >
                    <div className={s.categorie__link}>
                      {item.total}
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
    </div>
  );
};
CategoriesQuery.propTypes = {
  updateData: PropTypes.func,
};
export default CategoriesQuery;
