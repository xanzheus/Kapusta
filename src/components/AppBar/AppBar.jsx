import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
// import { useGetCurrentUserQuery } from 'redux/service/currentUserAPI';
import { useSelector } from 'react-redux';
import style from './AppBar.module.scss';

const AppBar = () => {
  const accessToken = useSelector(state => state.auth.accessToken);

  // const { data } = useGetCurrentUserQuery();
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
