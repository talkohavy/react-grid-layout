import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/index';
import SingleDashboardPage from './pages/DashboardsPage/SingleDashboardPage';

const HomePage = lazy(() => import('./pages/Home'));
const DashboardsPage = lazy(() => import('./pages/DashboardsPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path='/index.html' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboards' element={<DashboardsPage />} />
          <Route path='/dashboards/:id' element={<SingleDashboardPage />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
