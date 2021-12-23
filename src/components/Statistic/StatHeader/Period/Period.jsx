import { useState } from 'react';
import { format } from 'date-fns';
import s from './Period.module.scss';
// LOCALISE
import { useTranslation } from 'react-i18next';

const Period = ({ monthRangePicker, month, year }) => {
  const [date, setDate] = useState(new Date());
  const currentMonth = new Date();

  // LOCALISE
  const { t } = useTranslation();

  return (
    <div className={s.period}>
      <h2 className={s.period__title}>{t('period.period')}:</h2>

      <div className={s.period__select}>
        <button
          className={s.search__buttonPickerBack}
          onClick={() => {
            setDate(date, -1);
            monthRangePicker(date, -1);
          }}
        ></button>

        <div className={s.period__currentDate}>{`${month} ${year}`}</div>

        <button
          disabled={format(date, 'yyyy-MM-dd') === format(currentMonth, 'yyyy-MM-dd') && true}
          className={
            format(date, 'yyyy-MM-dd') === format(currentMonth, 'yyyy-MM-dd')
              ? s.search__buttonPickerNextDisabled
              : s.search__buttonPickerNext
          }
          onClick={() => {
            setDate(date, +1);
            monthRangePicker(date, +1);
          }}
        ></button>
      </div>
    </div>
  );
};

export default Period;
