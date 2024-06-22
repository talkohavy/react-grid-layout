import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { widgetsMapper } from '../../components/customWidgets/widgetsMapper';
import Dashboard from '../../components/dashboards/Dashboard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { dashboards, widgets } from './mockDatabase';

export default function SingleDashboardPage() {
  const { id: dashboardId } = useParams();

  const { value: allDashboards, setValue: setDashboards } = useLocalStorage('dashboards', dashboards);

  const {
    data,
    title,
    settings: dashboardSettings,
  } = useMemo(() => {
    const selectedDashboard = allDashboards.find((dashboard) => dashboard.id.toString() === dashboardId);

    const extendedDashboard = {
      ...selectedDashboard,
      data: selectedDashboard.data.map((dashboardWidget) => {
        const matchWidgetWithData = widgets.find((currentWidget) => currentWidget.id === dashboardWidget.i);
        return { ...dashboardWidget, type: matchWidgetWithData.type, props: matchWidgetWithData.props };
      }),
    };
    return extendedDashboard;
  }, [allDashboards, dashboardId]);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>
      <p>{title}</p>

      <div className='flex size-full justify-between gap-4'>
        <Dashboard
          data={data}
          settings={dashboardSettings}
          onLayoutChange={({ newLayout }) => {
            setDashboards((prevDashboards) => {
              const newDashboards = prevDashboards.map((dashboard) => {
                if (dashboard.id.toString() === dashboardId) return { ...dashboard, data: newLayout };

                return dashboard;
              });

              return newDashboards;
            });
          }}
          widgetsTypeToRendererMapper={widgetsMapper}
        />
      </div>
    </div>
  );
}
