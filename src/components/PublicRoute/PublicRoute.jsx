import { Navigate } from 'react-router-dom';

const PublicRoute = ({ accessToken, children }) => {
  const auth = !accessToken;
  return auth ? children : <Navigate to="/profile" />;
};

export default PublicRoute;
