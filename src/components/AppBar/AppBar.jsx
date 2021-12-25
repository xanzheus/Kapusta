import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import Snowflakes from 'magic-snowflakes';
import { useGetDataUserQuery } from 'redux/service/userAPI';
import i18n from '../../localize_i18/i18next';
import { useSelector } from 'react-redux';
import style from './AppBar.module.scss';

const AppBar = () => {
  const { isSuccess } = useGetDataUserQuery();
  const snowflakes = new Snowflakes({ height: 40, speed: 0.1, count: 16 });

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  const accessToken = useSelector(state => state.auth.accessToken);

  snowflakes.start();
  return (
    <>
      <header className={style.header}>
        <Container>
          <div className={style.header__wrapper}>
            <Link to="/developers">
              <div className={style.logo}></div>
            </Link>
            {/* <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('ru')}>RU</button> */}
            {console.log(`AppBar ${isSuccess}`)}
            {isSuccess && accessToken && <UserMenu />}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
