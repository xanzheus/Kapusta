import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

const IconAvatar = ({ avatarUrl, width, height }) => {
  const fullName = 'Nikolay Mosalov';
  return (
    <>
      <Avatar alt={fullName} src={avatarUrl} sx={{ width, height }} />
    </>
  );
};

IconAvatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default IconAvatar;
