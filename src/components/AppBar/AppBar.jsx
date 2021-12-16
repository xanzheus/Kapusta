import { useLocation } from 'react-router';
import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import style from './AppBar.module.scss';

const AppBar = () => {
  let location = useLocation();

  return (
    <>
      <header className={style.header}>
        <Container>
          <div className={style.header__wrapper}>
            <div className={style.logo}></div>
            {location.pathname === '/balance' || ('/profile' && <UserMenu />)}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
