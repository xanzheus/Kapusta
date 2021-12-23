import { COLORS } from '../../Constants';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import style from './DevelopersPage.module.scss';

const CardDeveloper = ({ firstName, lastName, avatarUrl, email, linkedinLink, gitLink, role }) => {
  return (
    <>
      <div className={style.developer__wrapper}>
        <img
          src={avatarUrl}
          alt={`Developer ${firstName} ${lastName}`}
          className={style.developer__photo}
        />
        <h2 className={style.developer__name}>{`${firstName} ${lastName}`}</h2>
        {role.map(el => (
          <p className={style.developer__role}>{el}</p>
        ))}
        <ul className={style.list}>
          <li>
            <a href={`mailto:${email}`} className={style.developer__email}>
              <EmailIcon sx={{ fontSize: 32, color: COLORS.mainAccent }} />
            </a>
          </li>
          <li>
            <a
              href={linkedinLink}
              className={style.developer__linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon sx={{ fontSize: 32, color: COLORS.mainAccent }} />
            </a>
          </li>
          <li>
            <a href={gitLink} className={style.git} target="_blank" rel="noreferrer">
              <GitHubIcon sx={{ fontSize: 32, color: COLORS.mainAccent }} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CardDeveloper;
