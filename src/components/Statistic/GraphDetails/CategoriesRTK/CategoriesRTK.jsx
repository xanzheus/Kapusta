import { useState } from 'react';
import PropTypes from 'prop-types';
import { useGetCategoriesQuery } from '../../../../redux/service/transactionApi';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import sprite from '../../../../images/svg/sprite.svg';
import dataTranslated from './../translateDataFunction.jsx';
// import newData from '../translateDataFunction';
import s from './CategoriesRTK.module.scss';
// LOCALISE
import { useTranslation } from 'react-i18next';

const CategoriesQuery = ({ updateData, setActiveCalss, setCategory, startDate, endDate }) => {
  const { data = [], isLoading, isSuccess } = useGetCategoriesQuery({ startDate, endDate });
  const [value, setValue] = useState('expense');

  // LOCALISE
  const { t } = useTranslation();

  // ************** Функция сортировки только РАСХОДЫ(ДОХОДЫ)
  const sortCategoryValues = (type, value) => {
    const newCat = value.filter(category => {
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
          {value === 'expense' ? t('headersTabs.consumption') : t('headersTabs.income')}
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
      {isSuccess && (
        <div className={s.income}>
          <div className={s.categories__listItems}>
            <ul className={s.categorie__list}>
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
