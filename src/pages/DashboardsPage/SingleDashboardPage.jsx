import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { widgetsMapper } from '../../components/customWidgets/widgetsMapper';
import Dashboard from '../../components/dashboards/Dashboard';
import { dashboards } from './mockDB';

export default function SingleDashboardPage() {
  const { id: dashboardId } = useParams();

  const {
    title,
    data,
    settings: dashboardSettings,
  } = useMemo(() => {
    const currentDashboard = dashboards.find((currentDashboard) => currentDashboard.id.toString() === dashboardId);

    if (!currentDashboard?.data) return { ...currentDashboard, widgetsLayout: [] };

    return currentDashboard;
  }, [dashboardId]);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>
      <p>{title}</p>

      <div className='flex size-full justify-between gap-4'>
        <Dashboard
          data={data}
          settings={dashboardSettings}
          onLayoutChange={(newLayout) => {
            console.log('newLayout is:', newLayout);
          }}
          widgetsTypeToRendererMapper={widgetsMapper}
        />
      </div>
    </div>
  );
}
