import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

import { useGetCurrentUserQuery } from 'redux/service/currentUserAPI';

const IconAvatar = ({ width, height }) => {
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

  const fullNameValid = firstName || lastName ? `${firstName} ${lastName}` : email;

  return (
    <>
      <Avatar alt={fullNameValid} src={avatar} sx={{ width, height }} />
    </>
  );
};

IconAvatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default IconAvatar;
