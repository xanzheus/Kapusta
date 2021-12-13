import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'components/Container';
import AppBar from 'components/AppBar/AppBar';
import Registration from 'pages/Registration';
import StatisticPage from 'pages/StatisticPage';
import ProfilePage from 'pages/ProfilePage';
import Login from 'pages/Login';

const BalancePage = lazy(() => import('pages' /* webpackChunkName: "BalancePage" */));

const NotFound = lazy(() =>
  import('pages/NotFound/NotFound' /* webpackChunkName: "Not-Found-page" */),
);

function App() {
  return (
    <>
      <AppBar />
      <main>
        {/* <Container> */}
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="login" element={<Login />} />

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
        {/* </Container> */}
      </main>
    </>
  );
}

export default App;
