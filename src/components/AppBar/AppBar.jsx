import { useState } from 'react';
import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import Snowfall from 'react-snowfall';
import Snowflakes from 'magic-snowflakes';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import style from './AppBar.module.scss';

const AppBar = () => {
  // const [snowVisibility, setSnowVisibility] = useState(false);
  const snowflakes = new Snowflakes({ height: 40, speed: 0.2, count: 16 });

  true && snowflakes.start();

  // const [showPassword, setShowPassword] = useState(false);
  const accessToken = useSelector(state => state.auth.accessToken);
  // const handleClickSnow = () => {
  //   console.log(snowVisibility);
  //   setSnowVisibility(!snowVisibility);
  // };

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
