import { useLocation } from 'react-router';
import UserMenu from 'components/UserMenu';
import style from './AppBar.module.scss';

const AppBar = () => {
  let location = useLocation();

  return (
    <>
      <header className={style.header}>
        <div className={style.logo}></div>

        {location.pathname === '/balance' && <UserMenu />}
      </header>
    </>
  );
};

export default AppBar;
