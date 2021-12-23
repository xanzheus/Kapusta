import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme';
import AppBar from 'components/AppBar/AppBar';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Registration from 'pages/Registration';
import { useSelector } from 'react-redux';
import Login from 'pages/Login';
import style from './App.module.scss';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Toaster } from 'react-hot-toast';
import Loader from 'components/Loader';
import { BalancePage, ProfilePage, StatisticPage, DevelopersPage } from 'pages';

const App = () => {
  const accessToken = useSelector(state => state.auth.accessToken);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className={style.backgroundWrapperAuth}>
              <PublicRoute accessToken={accessToken}>
                <Registration />
              </PublicRoute>
            </div>
          }
        />

        <Route
          path="login"
          element={
            <div className={style.backgroundWrapperAuth}>
              <PublicRoute accessToken={accessToken}>
                <Login />
              </PublicRoute>
            </div>
          }
        />

        <Route
          path="balance"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<Loader />}>
                <main className={style.main}>
                  <div className={style.backgroundWrapperMain}>
                    <BalancePage />{' '}
                  </div>
                </main>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<Loader />}>
                <main className={style.main}>
                  <div className={style.backgroundWrapperMain}>
                    <ProfilePage />{' '}
                  </div>
                </main>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="developers"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense
                fallback={
                  <div className={style.loader}>
                    <Stack sx={{ color: 'grey.500' }}>
                      <CircularProgress color="inherit" />
                    </Stack>
                  </div>
                }
              >
                <main className={style.main}>
                  <div className={style.backgroundWrapperMain}>
                    <DevelopersPage />{' '}
                  </div>
                </main>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="reports"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<Loader />}>
                <main className={style.main}>
                  <div className={style.backgroundWrapperMain}>
                    <StatisticPage />{' '}
                  </div>
                </main>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute accessToken={accessToken}>
              <Suspense fallback={<Loader />}>
                <main className={style.main}>
                  <div className={style.backgroundWrapperMain}>
                    <BalancePage />{' '}
                  </div>
                </main>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PublicRoute accessToken={accessToken}>
              <div className={style.backgroundWrapperAuth}>
                <Registration />
              </div>
            </PublicRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
