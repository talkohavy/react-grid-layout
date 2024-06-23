import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { widgetsMapper } from '../../components/customWidgets/widgetsMapper';
import Dashboard from '../../components/dashboards/Dashboard';
import Widget from '../../components/dashboards/Widget';
import { updateDashboardFlow } from '../../store/slices/dashboards';
import { getDashboardDataSelector } from '../../store/slices/dashboards/selectors';

export default function SingleDashboardPage() {
  const { id: dashboardId } = useParams();

  const dashboard = useSelector(getDashboardDataSelector(dashboardId));
  const dispatch = useDispatch();

  if (!dashboard) return <div>Dashboard not found</div>;

  const { id, data, title, settings: dashboardSettings } = dashboard;

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>
      <p>{title}</p>

      <div className='flex size-full justify-between gap-4'>
        <Dashboard
          data={data}
          settings={dashboardSettings}
          onLayoutChange={({ newLayout }) => {
            dispatch(updateDashboardFlow({ id, layout: newLayout }));
          }}
        >
          {/* For future reference, it is recommended by react-grid-layout to memoize the children */}
          {data.map((widget) => {
            const { i: widgetId, type, props } = widget;

            return (
              <div key={widgetId}>
                <Widget gapBetweenWidgets={dashboardSettings.dashboard.gapBetweenWidgets}>
                  {widgetsMapper[type]({ dashboardId, widgetId, ...props })}
                </Widget>
              </div>
            );
          })}
        </Dashboard>
      </div>
    </div>
  );
}
