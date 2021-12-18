import RegisterForm from 'components/RegistrationForm';
import style from './registrationPage.module.scss';
import Container from 'components/Container';
import kapusta_title from '../../images/kapusta_title.svg';

const Registration = () => {
  return (
    <section className={style.registration}>
      <Container>
        <div className={style.main__wrapper}>
          <div className={style.title__wrapper}>
            <div>
              <img className={style.registration__title} src={kapusta_title} alt="main-title" />
              <p className={style.registration__subtitle}>Smart Finance</p>
            </div>
          </div>
          <RegisterForm />
        </div>
      </Container>
    </section>
  );
};

export default Registration;
