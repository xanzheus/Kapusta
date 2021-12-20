import { Link } from 'react-router-dom';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { InviteModal } from 'components/Modal';
import ShareIcon from '@mui/icons-material/Share';
import FormaUser from './FormaUser';
import FormaUpdatePhoto from './FormaUpdatePhoto';
import { COLORS } from '../../Constants';

import { useGetCurrentUserQuery } from 'redux/service/currentUserAPI';

import IconAvatar from 'components/IconAvatar';
import Container from 'components/Container';
import style from './ProfilePage.module.scss';

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const { data } = useGetCurrentUserQuery();

  // const {
  //   email,
  //   fullName: { firstName, lastName },
  //   avatar,
  //   settings: { language, theme, currency },
  // } = data.data.user;

  const { data, isLoading, isFetching } = useGetCurrentUserQuery();

  return (
    <>
      {!isFetching && (
        <section className={style.profile}>
          <Container>
            <IconButton
              className={style.profile__buttonShare}
              aria-label="Поделиться с другом"
              onClick={handleOpen}
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
                  <IconAvatar src={data.data.user.avatar} width={240} height={240} />
                  <FormaUpdatePhoto />
                </div>

                <div className={style.profile__info}>
                  {data.data.user.fullName.firstName || data.data.user.fullName.lastName}
                  <h2 className={style.profile__name}>
                    {data.data.user.fullName.firstName || data.data.user.fullName.lastName
                      ? `${data.data.user.fullName.firstName} ${data.data.user.fullName.lastName}`
                      : ''}
                  </h2>{' '}
                  <h3 className={style.profile__email}>{data.data.user.email}</h3>
                </div>
              </div>
              <div className={style.profile__settings}>
                <FormaUser
                  firstName={data.data.user.fullName.firstName}
                  lastName={data.data.user.fullName.lastName}
                  email={data.data.user.email}
                  language={data.data.user.language}
                  currency={data.data.user.currency}
                  theme={data.data.user.theme}
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
