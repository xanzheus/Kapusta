import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import SelectionModal from 'components/Modal/SelectionModal';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import IconAvatar from 'components/IconAvatar';
import style from './UserMenu.module.scss';

////////////test/////////////////////////

const user = {
  email: 'john.doe@gmail.com',
  fullName: {
    firstName: 'Nikolay',
    lastName: 'Mosalov',
  },
  avatar: 'https://live.staticflickr.com/65535/51355167828_34e6d20320_n.jpg',
  settings: {
    language: 'en',
    theme: 'light',
    currency: 'UAH',
  },
};
///====////////////////////

const UserMenu = () => {
  const fullName = `${user.fullName.firstName} ${user.fullName.lastName} `;
  const avatarUrl = 'https://live.staticflickr.com/65535/51355167828_34e6d20320_n.jpg';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();

  const goToHomePage = () => navigate('/');

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  return (
    <Stack direction="row" alignItems="center" spacing={2} color="#CBCCD0">
      <IconAvatar src={avatarUrl} width={32} height={32} />
      {small && <LogoutIcon onClick={handleOpen} />}
      {medium && (
        <>
          <p className={style.user__name}>{fullName}</p>
          <span className={style.user__line}></span>
          <button className={style.user__button__logout} onClick={handleOpen}>
            Выйти
          </button>
        </>
      )}
      {large && (
        <>
          <p className={style.user__name}>{fullName}</p>
          <span className={style.user__line}></span>
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
