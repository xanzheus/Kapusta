import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import Snowflakes from 'magic-snowflakes';
import { useGetDataUserQuery } from 'redux/service/userAPI';
import style from './AppBar.module.scss';

const AppBar = () => {
  const { isFetching } = useGetDataUserQuery();
  const snowflakes = new Snowflakes({ height: 40, speed: 0.1, count: 16 });
  snowflakes.start();
  return (
    <>
      <header className={style.header}>
        <Container>
          <div className={style.header__wrapper}>
            <Link to="/balance">
              <div className={style.logo}></div>
            </Link>
            {/* {!isFetching && <UserMenu />} */}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
