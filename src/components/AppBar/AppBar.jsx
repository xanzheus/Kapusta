import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Snowflakes from 'magic-snowflakes';
import style from './AppBar.module.scss';

const AppBar = () => {
  const snowflakes = new Snowflakes({ height: 40, speed: 0.1, count: 16 });
  snowflakes.start();
  const accessToken = useSelector(state => state.auth.accessToken);

  return (
    <>
      <header className={style.header}>
        <Container>
          <div className={style.header__wrapper}>
            <Link to="/balance">
              <div className={style.logo}></div>
            </Link>
            {accessToken && <UserMenu />}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
