import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={style.footer}>
        <Container>
          <div className={style.footer__info}>
            <div className={style.footer__copyrightParth}>
              <p className={style.footer__copyrightText}>&copy; 2021</p>
              <p className={style.footer__copyrightText}>
                <span lang="ru">Все права защищены</span>
              </p>
            </div>
            <div className={style.footer__developedParth}>
              <p className={style.footer__developedText}>
                <span lang="ru">Разработано с</span>

                <FavoriteIcon className={style.heart} width="14" height="12" />
              </p>
              <p className={style.footer__developedText}>
                <span lang="ru"></span>
                <span className={style.footer__developedWrapper}>
                  <Link className={style.footer__link} to="/developers">
                    <span lang="ru">студентами GoIT</span>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
