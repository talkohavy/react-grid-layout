import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { widgetsMapper } from '../../components/customWidgets/widgetsMapper';
import WidgetWizard from '../../components/customWidgets/WidgetWizard';
import Dashboard from '../../components/dashboards/Dashboard';
import Widget from '../../components/dashboards/Widget';
import { createNewWidgetFlow, updateDashboardFlow } from '../../store/slices/dashboards';
import { getDashboardDataSelector } from '../../store/slices/dashboards/selectors';

export default function SingleDashboardPage() {
  const { id: dashboardId } = useParams();

  const dashboard = useSelector(getDashboardDataSelector(dashboardId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  if (!dashboard) return <div>Dashboard not found</div>;

  const { id, data, title, settings: dashboardSettings } = dashboard;

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>

      <div className='flex w-full items-center justify-between'>
        <p>Title: {title}</p>

        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='rounded-lg border bg-neutral-50 px-1 py-2 hover:bg-red-300'
        >
          + Add Widget
        </button>
      </div>

      <WidgetWizard
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onConfirmClick={(widget) => dispatch(createNewWidgetFlow({ dashboardId, widget }))}
      />

      <div className='flex size-full justify-between gap-4'>
        <Dashboard
          data={data}
          settings={dashboardSettings}
          onLayoutChange={({ newLayout }) => {
            dispatch(updateDashboardFlow({ id, layout: newLayout }));
          }}
        >
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
