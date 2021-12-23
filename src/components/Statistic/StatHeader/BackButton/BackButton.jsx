import { Link } from 'react-router-dom';
// LOCALISE
import { useTranslation } from 'react-i18next';
import s from './BackButton.module.scss';

const BackButton = () => {
  // LOCALISE
  const { t } = useTranslation();

  return (
    <div className={s.backButton}>
      <Link to="/">
        <div className={s.backButton__block}>
          {' '}
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.backButtonIcon}
          >
            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="#FF751D" />
          </svg>
          <p className={s.backButton__text}>{t('statHeader.backButton')}</p>
        </div>
      </Link>
    </div>
  );
};

export default BackButton;
