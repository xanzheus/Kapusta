import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ accessToken, children }) => {
  const auth = accessToken;
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
