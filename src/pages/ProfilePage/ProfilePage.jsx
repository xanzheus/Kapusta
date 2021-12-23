import { Link } from 'react-router-dom';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { InviteModal } from 'components/Modal';
import ShareIcon from '@mui/icons-material/Share';
import FormaUser from './FormaUser';
import FormaUpdatePhoto from './FormaUpdatePhoto';
import { COLORS } from '../../Constants';

import { useGetDataUserQuery } from 'redux/service/userAPI';

import IconAvatar from 'components/IconAvatar';
import Container from 'components/Container';
import style from './ProfilePage.module.scss';

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const { data, isSuccess } = useGetDataUserQuery();

  const firstName = data => data.data.user.fullName.firstName;
  const lastName = data => data.data.user.fullName.lastName;
  const avatar = data => data.data.user.avatar;
  const language = data => data.data.user.settings.language;
  const currency = data => data.data.user.settings.currency;
  const theme = data => data.data.user.settings.theme;
  const phone = data => data.data.user.phone;

  return (
    <>
      {isSuccess && (
        <section className={style.profile}>
          <Container>
            <IconButton
              className={style.profile__buttonShare}
              aria-label="Поделиться с другом"
              onClick={handleOpen}
              type={'button'}
            >
              <ShareIcon sx={{ fontSize: 32, color: COLORS.mainAccent }} />
            </IconButton>

            <Link className={style.buttonBack} type="button" to={'/balance'}>
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={style.backButtonIcon}
              >
                <path
                  d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z"
                  fill="#FF751D"
                />
              </svg>
            </Link>
            <div className={style.profile__wrapper}>
              <div className={style.profile__sidebar}>
                <div className={style.avatar__wrapper}>
                  <IconAvatar src={avatar(data)} width={240} height={240} />
                  <FormaUpdatePhoto />
                </div>

                <div className={style.profile__info}>
                  {(firstName(data) || data.data.user.fullName.lastName) && (
                    <h2 className={style.profile__name}>
                      {firstName(data) || lastName(data)
                        ? `${firstName(data)} ${lastName(data)}`
                        : ''}
                    </h2>
                  )}
                  <h3 className={style.profile__email}>{data.data.user.email}</h3>
                </div>
              </div>
              <div className={style.profile__settings}>
                <FormaUser
                  firstName={firstName(data)}
                  lastName={lastName(data)}
                  language={language(data)}
                  currency={currency(data)}
                  theme={theme(data)}
                  phone={phone(data)}
                />
              </div>
            </div>
            {open && <InviteModal open={open} handleClose={handleClose} />}
          </Container>
        </section>
      )}
    </>
  );
};

export default ProfilePage;
