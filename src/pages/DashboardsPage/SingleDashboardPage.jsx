import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '../../components/dashboards/Dashboard';
import { mockData } from './mockDB';

export default function SingleDashboardPage() {
  const { id } = useParams();

  const widgetsLayout = useMemo(() => {
    const currentId = Number.parseInt(id);

    const currentDashboard = mockData.find((item) => item.id === currentId);

    if (!currentDashboard?.widgetsLayout) return [];

    return currentDashboard.widgetsLayout;
  }, [id]);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>

      <Dashboard
        settings={{
          grid: {
            color: '#ccc',
            // alwaysVisible: true,
          },
          dashboard: {
            gapBetweenWidgets: 0,
            gapFromWalls: 0,
            // allowOverlap: true,
            // floatType: 'free-form',
          },
        }}
        data={widgetsLayout}
        onLayoutChange={console.log}
      />
    </div>
  );
}
