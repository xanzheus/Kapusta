import { useState } from 'react';
import PropTypes from 'prop-types';
import sprite from '../../../../images/svg/sprite.svg';
import s from './Categories.module.scss';

const Categories = ({ updateData, setActiveCalss }) => {
  const [value, setValue] = useState('РАСХОДЫ');
  const [selectedCategory, setselectedCategory] = useState('');
  const [isActive, setIsActive] = useState(false);

  // категории РЫБА доходы
  const categories = [
    { name: 'Продукты', id: 1, amount: 5000.0 },
    { name: 'Алкоголь', id: 2, amount: 200.0 },
    { name: 'Развлечения', id: 3, amount: 800.0 },
    { name: 'Здоровье', id: 4, amount: 900.0 },
    { name: 'Транспорт', id: 5, amount: 2000.0 },
    { name: 'Коммуналка, связь', id: 6, amount: 1500.0 },
    { name: 'Всё для дома', id: 7, amount: 1500.0 },
    { name: 'Образование', id: 8, amount: 2400.0 },
    { name: 'Прочее', id: 9, amount: 12000.06 },
  ];

  // категории РЫБА расходы
  const categoriesIncome = [
    { name: 'ЗП', id: 1, amount: 5000.0 },
    { name: 'Доп.доход', id: 2, amount: 200.0 },
  ];

  const resultValue = () => {
    if (value === 'РАСХОДЫ') {
      setValue('ДОХОДЫ');
    }
    if (value === 'ДОХОДЫ') {
      setValue('РАСХОДЫ');
    }
  };

  return (
    <div className={s.categories}>
      <div className={s.categories__select}>
        <button
          className={s.search__buttonPickerBack}
          onClick={() => {
            resultValue();
          }}
        ></button>
        <div
          onChange={() => {
            updateData(value);
          }}
          className={s.categories__currentValue}
        >
          {value}
        </div>

        <button
          className={s.search__buttonPickerNext}
          onClick={() => {
            resultValue();
          }}
        ></button>
      </div>

      {value === 'РАСХОДЫ' && (
        <div className={s.income}>
          <div className={s.categories__listItems}>
            <ul className={s.categorie__list}>
              {categories.map(item => {
                return (
                  <li
                    className={s.categorie__items}
                    key={item.name}
                    onClick={() => {
                      setselectedCategory(item.name);
                      console.log(selectedCategory);
                      setIsActive(true);
                      setActiveCalss(true);
                    }}
                  >
                    {item.amount}
                    <a>
                      {/* <svg className={isActive ? s.icon : s.iconActive}> */}
                      <svg className={s.icon}>
                        <use xlinkHref={`${sprite}#${item.name}`} />
                      </svg>
                    </a>
                    <p className={s.categorie__name}>{item.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {value === 'ДОХОДЫ' && (
        <div className={s.costs}>
          <div className={s.categories__listItems}>
            <ul className={s.categorie__list}>
              {categoriesIncome.map(item => {
                return (
                  <li
                    className={s.categorie__items}
                    key={item.name}
                    onClick={() => {
                      setselectedCategory(item.name);
                      console.log(selectedCategory);
                      setIsActive(true);
                      setActiveCalss(true);
                    }}
                  >
                    {item.amount}
                    <a>
                      <svg className={s.icon}>
                        <use xlinkHref={`${sprite}#${item.name}`} />
                      </svg>
                    </a>
                    <p className={s.categorie__name}>{item.name}</p>
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

Categories.propTypes = {
  updateData: PropTypes.func,
};

export default Categories;
