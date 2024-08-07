import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddWidgetModal from '../../components/customWidgets/AddWidgetModal';
import EditWidgetModal from '../../components/customWidgets/EditWidgetModal';
import { widgetsMapper } from '../../components/customWidgets/widgetsMapper';
import Dashboard from '../../components/dashboards/Dashboard';
import Widget from '../../components/dashboards/Widget';
import { createNewWidgetFlow, updateDashboardFlow, updateWidgetFlow } from '../../store/slices/dashboards';
import { getDashboardDataSelector } from '../../store/slices/dashboards/selectors';
import WidgetsPool from './WidgetsPool';

const gapBetweenWidgets = 10;

/**
 * @typedef {import('react-grid-layout').Layout} Layout
 */

export default function SingleDashboardPage() {
  const { id: dashboardId } = useParams();

  const dashboard = useSelector(getDashboardDataSelector(dashboardId));
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
  const [isEditWidgetModalOpen, setIsEditWidgetModalOpen] = useState(false);
  const [widgetIdToEdit, setWidgetIdToEdit] = useState(null);
  const dispatch = useDispatch();

  const onEditWidgetMenuItemClick = (widgetId) => {
    setIsEditWidgetModalOpen(true);
    setWidgetIdToEdit(widgetId);
  };

  if (!dashboard) return <div>Dashboard not found</div>;

  const { id, data: widgets, title, settings: dashboardSettings } = dashboard;

  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 overflow-auto p-4'>
      <div className='text-4xl font-bold'>Single Dashboard Page</div>

      <div className='flex w-full items-center justify-between'>
        <p>Title: {title}</p>

        <button
          type='button'
          onClick={() => setIsAddWidgetModalOpen(true)}
          className='rounded-lg border bg-neutral-50 p-2 hover:bg-red-300'
        >
          + Add Widget
        </button>
      </div>

      <div className='flex size-full min-h-xl justify-between gap-4'>
        <Dashboard
          data={widgets}
          settings={dashboardSettings}
          onLayoutChange={({ newLayout }) => {
            dispatch(updateDashboardFlow({ id, layout: newLayout }));
          }}
        >
          {widgets.map((widget) => {
            const { i: widgetId, type, props } = widget;

            return (
              <div key={widgetId}>
                <Widget gapBetweenWidgets={gapBetweenWidgets}>
                  {widgetsMapper[type]({ dashboardId, widgetId, onEditWidgetMenuItemClick, ...props })}
                </Widget>
              </div>
            );
          })}
        </Dashboard>
      </div>

      <WidgetsPool dashboardId={dashboardId} />

      <AddWidgetModal
        isModalOpen={isAddWidgetModalOpen}
        setIsModalOpen={setIsAddWidgetModalOpen}
        onConfirmClick={(widget, layoutProps) =>
          void dispatch(createNewWidgetFlow({ dashboardId, widget, layoutProps }))
        }
      />

      {widgetIdToEdit && (
        <EditWidgetModal
          isModalOpen={isEditWidgetModalOpen}
          setIsModalOpen={setIsEditWidgetModalOpen}
          dashboardId={dashboardId}
          widgetId={widgetIdToEdit}
          onClose={() => setWidgetIdToEdit(null)}
          onConfirmClick={({ type, props }, layoutProps) => {
            dispatch(updateWidgetFlow({ dashboardId, widgetId: widgetIdToEdit, type, props, layoutProps }));
          }}
        />
      )}
    </div>
  );
}
