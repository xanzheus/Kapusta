import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme';
import AppBar from 'components/AppBar/AppBar';
import Registration from 'pages/Registration';
import StatisticPage from 'pages/StatisticPage';
import ProfilePage from 'pages/ProfilePage';
import Login from 'pages/Login';
import style from './App.module.scss';

const BalancePage = lazy(() => import('pages' /* webpackChunkName: "BalancePage" */));

const NotFound = lazy(() =>
  import('pages/NotFound/NotFound' /* webpackChunkName: "Not-Found-page" */),
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      {/*нужно добавить условие, если не залогинен, то рендерить auth*/}
      <div className={style.backgroundWrapperAuth}>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
      {/*нужно добавить условие, если залогинен, то рендерить мейн*/}
      <main className={style.main}>
        <div className={style.backgroundWrapperMain}>
          <Routes>
            <Route
              path="balance"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <BalancePage />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <ProfilePage />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <StatisticPage />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
