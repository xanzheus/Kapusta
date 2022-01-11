import { Link } from 'react-router-dom';
import { useGetDataDevelopersQuery } from 'redux/service/developerAPI';
import Container from 'components/Container';
import CardDeveloper from './CardDeveloper';
import { useTranslation } from 'react-i18next';
import style from './DevelopersPage.module.scss';

const DevelopersPage = () => {
  const { data, isSuccess } = useGetDataDevelopersQuery();
  const id = obj => obj._id;
  const firstName = obj => obj.fullName.firstName;
  const lastName = obj => obj.fullName.lastName;
  const avatarUrl = obj => obj.avatarUrl;
  const email = obj => obj.email;
  const linkedinLink = obj => obj.linkedinLink;
  const gitLink = obj => obj.gitLink;
  const role = obj => obj.role;
  const { t } = useTranslation();
  return (
    <>
      <section className={style.developers}>
        <Container>
          <Link className={style.buttonBack} type="button" to={'/balance'}>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={style.backButtonIcon}
            >
              <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#FF751D" />
            </svg>
          </Link>

          <h2 className={style.developers__title}>{t('developers.team')}</h2>
          {isSuccess && (
            <ul className={style.developers__list}>
              {data.data.result.map(obj => (
                <li key={id(obj)} className={style.developers__item}>
                  <CardDeveloper
                    firstName={firstName(obj)}
                    lastName={lastName(obj)}
                    avatarUrl={avatarUrl(obj)}
                    email={email(obj)}
                    linkedinLink={linkedinLink(obj)}
                    gitLink={gitLink(obj)}
                    role={role(obj)}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
};

export default DevelopersPage;
