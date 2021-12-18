import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import SelectionModal from 'components/Modal/SelectionModal';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import IconAvatar from 'components/IconAvatar';
import { COLORS } from '../../Constants';
import { useLogoutMutation } from 'redux/service/userAPI';
import { useGetCurrentUserQuery } from 'redux/service/currentUserAPI';
import style from './UserMenu.module.scss';

const UserMenu = () => {
  const navigate = useNavigate();

  const {
    data: {
      data: {
        user: {
          email,
          fullName: { firstName, lastName },
          avatar,
        },
      },
    },
  } = useGetCurrentUserQuery();

  const [logout] = useLogoutMutation();
  const handleClick = () => {
    navigate('/profile');
  };

  const fullNameValid = firstName || lastName ? `${firstName} ${lastName}` : '';
  const avatarUrl = avatar ? avatar : '';

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const goToHomePage = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  return (
    <Stack direction="row" alignItems="center" spacing={2} color="#CBCCD0">
      <button className={style.buttonProfile} type="button" onClick={handleClick}>
        <IconAvatar src={avatarUrl} width={32} height={32} />{' '}
        {small && (
          <LogoutIcon
            onClick={handleOpen}
            sx={{ fontSize: 18, color: COLORS.auxiliaryDark }}
            titleAccess={'Выйти'}
          />
        )}
        {medium && (
          <>
            {(fullNameValid || email) && (
              <p className={style.user__name}>{fullNameValid ? fullNameValid : email}</p>
            )}
            <span className={style.user__line}></span>{' '}
          </>
        )}
        {large && (
          <>
            {(fullNameValid || email) && (
              <p className={style.user__name}>{fullNameValid ? fullNameValid : email}</p>
            )}
            <span className={style.user__line}></span>
          </>
        )}
      </button>

      {medium && (
        <>
          <button className={style.user__button__logout} onClick={handleOpen}>
            Выйти
          </button>
        </>
      )}
      {large && (
        <>
          <button className={style.user__button__logout} onClick={handleOpen}>
            Выйти
          </button>
        </>
      )}

      {open && <SelectionModal open={open} handleClose={handleClose} onClick={goToHomePage} />}
    </Stack>
  );
};

export default UserMenu;
