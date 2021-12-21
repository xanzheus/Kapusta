import LoginForm from 'components/LoginForm';
import style from './loginPage.module.scss';
import Container from 'components/Container';
import kapusta_title from '../../images/kapusta_title.svg';

const Login = () => {
  return (
    <section className={style.registration}>
      <Container>
        <div className={style.main__wrapper}>
          <div className={style.title__wrapper}>
            <img className={style.registration__title} src={kapusta_title} alt="main-title" />
            <p className={style.registration__subtitle}>Smart Finance</p>
          </div>
          <LoginForm />
        </div>
      </Container>
    </section>
  );
};

export default Login;
