import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

////для теста /////////////////////////////
const user = {
  email: 'john.doe@gmail.com',
  fullName: {
    firstName: 'Nikolay',
    lastName: 'Mosalov',
  },
  avatar: 'https://www.belanta.vet/vet-blog/wp-content/uploads/2019/09/5-4.jpg',
  settings: {
    language: 'en',
    theme: 'light',
    currency: 'UAH',
  },
};

const {
  email,
  fullName: { firstName, lastName },
  avatar,
} = user;

///==========///////////

const fullName = firstName || lastName ? `${firstName} ${lastName}` : email;
const IconAvatar = ({ width, height }) => {
  return (
    <>
      <Avatar alt={fullName} src={avatar} sx={{ width, height }} />
    </>
  );
};

IconAvatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default IconAvatar;
