import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import s from './BackButton.module.css';

const BackButton = () => {
  return (
    <div>
      {/* <Button variant="outlined">Вернуться на главную</Button> */}
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default BackButton;
