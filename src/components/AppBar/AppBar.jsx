import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { useGetCurrentUserQuery } from 'redux/service/currentUserAPI';

import style from './AppBar.module.scss';

const AppBar = () => {
  const { data } = useGetCurrentUserQuery();
  return (
    <>
      <header className={style.header}>
        <Container>
          <div className={style.header__wrapper}>
            <div className={style.logo}></div>
            {data && <UserMenu />}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
