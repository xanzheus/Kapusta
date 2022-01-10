import { useMemo } from 'react';
import RegisterForm from 'components/RegistrationForm';
import style from './registrationPage.module.scss';
import Container from 'components/Container';
import kapusta_title from '../../images/kapusta_title.svg';

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/service/authSlice';

const Registration = () => {
  const dispatch = useDispatch();
  // URL PARAMS
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const newUser = useMemo(
    () => ({
      refreshToken,
      accessToken,
    }),
    [refreshToken, accessToken],
  );
  useEffect(() => {
    dispatch(setCredentials(newUser));
  }, [dispatch, newUser]);
  return (
    <section className={style.registration}>
      <Container>
        <div className={style.main__wrapper}>
          <div className={style.title__wrapper}>
            <img className={style.registration__title} src={kapusta_title} alt="main-title" />
            <p className={style.registration__subtitle}>Smart Finance</p>
          </div>
          <RegisterForm />
        </div>
      </Container>
    </section>
  );
};

export default Registration;
