import { Navigate } from 'react-router-dom';

const PublicRoute = ({ accessToken, children }) => {
  const auth = !accessToken;
  return auth ? children : <Navigate to="/balance" />;
};

export default PublicRoute;
