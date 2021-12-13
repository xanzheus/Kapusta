import { useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from 'components/Button';
import style from './BalanceTable.module.scss';

const BalanceLine = ({ userData }) => {
  const { balance, isStart } = userData;

  const [amount, setAmount] = useState(balance);
  const [start, setStart] = useState(isStart);

  const handleChangeBalance = event => setAmount(event.target.value);

  const onSubmit = event => {
    event.preventDefault();

    if (Number(amount) <= 0) {
      alert('Введите сумму');
      return;
    }

    const dateResponse = {
      balance: Number(amount),
      isStart: true,
    };
    console.log(dateResponse);
    console.log(amount);
    setStart(true);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="end" mb={1}>
        <p className={style.balance__title}>Баланс: </p>

        {start ? (
          <p className={style.balance__input}>{`${amount} UAH`}</p>
        ) : (
          <input
            className={style.balance__input}
            placeholder="00.00 UAH"
            onChange={handleChangeBalance}
            type="number"
            name="balance"
          />
        )}

        {start ? (
          <Button name="ПОДТВЕРДИТЬ" variant="secondary" type="submit" disabled={true} />
        ) : (
          <Button name="ПОДТВЕРДИТЬ" type="submit" onClick={onSubmit} variant="secondary" />
        )}

        <Link className={style.reports__link} to="/reports">
          Перейти к отчётам
        </Link>
      </Stack>
    </>
  );
};

export default BalanceLine;
