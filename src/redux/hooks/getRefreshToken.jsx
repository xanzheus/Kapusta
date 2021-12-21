import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getRefreshToken } from '../service/authSlice';

export const useAuth = () => {
  const refreshToken = useSelector(getRefreshToken);

  return useMemo(() => ({ refreshToken }), [refreshToken]);
};
