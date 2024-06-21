import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import Dashboard from '../../components/dashboards/Dashboard';
import { dashboards } from './mockDB';

export default function SingleDashboardPage() {
  const { id } = useParams();
  const [dashboardId, setDashboardId] = useState(+id);

  const {
    title,
    widgetsLayout,
    settings: dashboardSettings,
  } = useMemo(() => {
    const currentDashboard = dashboards.find((currentDashboard) => currentDashboard.id === dashboardId);

    if (!currentDashboard?.widgetsLayout) return { ...currentDashboard, widgetsLayout: [] };

    return currentDashboard;
  }, [dashboardId]);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>
      <p>{title}</p>

      <div className='flex size-full justify-between gap-4'>
        <div className='h-full w-44 bg-red-200 p-2'>
          <div
            className={clsx('cursor-pointer hover:text-red-500', dashboardId === 1 && 'text-blue-500')}
            onClick={() => setDashboardId(1)}
          >
            dashboard 1
          </div>
          <div
            className={clsx('cursor-pointer hover:text-red-500', dashboardId === 2 && 'text-blue-500')}
            onClick={() => setDashboardId(2)}
          >
            dashboard 2
          </div>
          <div
            className={clsx('cursor-pointer hover:text-red-500', dashboardId === 3 && 'text-blue-500')}
            onClick={() => setDashboardId(3)}
          >
            dashboard 3
          </div>
        </div>

        <Dashboard settings={dashboardSettings} data={widgetsLayout} onLayoutChange={console.log} />
      </div>
    </div>
  );
}
