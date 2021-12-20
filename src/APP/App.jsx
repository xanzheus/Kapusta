import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme';
import AppBar from 'components/AppBar/AppBar';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Registration from 'pages/Registration';
import { useSelector } from 'react-redux';
import Login from 'pages/Login';
import style from './App.module.scss';

const BalancePage = lazy(() =>
  import('pages/BalancePage/BalancePage' /* webpackChunkName: "BalancePage" */),
);

const ProfilePage = lazy(() =>
  import('pages/ProfilePage/ProfilePage' /* webpackChunkName: "Profile-page" */),
);

const StatisticPage = lazy(() =>
  import('pages/StatisticPage/StatisticPage' /* webpackChunkName: "Statistic-page" */),
);

const App = () => {
  const accessToken = useSelector(state => state.auth.accessToken);

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute accessToken={accessToken}>
              <Registration />
            </PublicRoute>
          }
        />

        <Route
          path="login"
          element={
            <PublicRoute accessToken={accessToken}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="balance"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<h1>Loading...</h1>}>
                <BalancePage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<h1>Loading...</h1>}>
                <ProfilePage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="reports"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<h1>Loading...</h1>}>
                <StatisticPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<h1>Loading...</h1>}>
                <BalancePage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PublicRoute accessToken={accessToken}>
              <Registration />
            </PublicRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
