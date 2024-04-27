import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/index';

const HomePage = lazy(() => import('./pages/Home'));
const SingleDashboardPage = lazy(() => import('./pages/DashboardsPage/SingleDashboardPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path='/index.html' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboards/:id' element={<SingleDashboardPage />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
