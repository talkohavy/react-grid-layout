import BarChart from '../../charts/BarChart';
import Undraggable from '../../dashboards/Widget/Undraggable';
import TopBar from '../TopBar';

/**
 * @param {{
 *   dashboardId: string,
 *   widgetId: string,
 *   onEditWidgetMenuItemClick: (widgetId: string) => void
 * }} props
 */
export default function BarChartWidget(props) {
  const { dashboardId, widgetId, onEditWidgetMenuItemClick } = props;

  return (
    <div className='size-full'>
      <TopBar dashboardId={dashboardId} widgetId={widgetId} onEditWidgetMenuItemClick={onEditWidgetMenuItemClick} />

      <Undraggable>
        <BarChart
          bars={[
            {
              name: 'Bar 1',
              data: [
                { x: 1, y: 10 },
                { x: 2, y: 20 },
                { x: 3, y: 30 },
                { x: 4, y: 40 },
                { x: 5, y: 50 },
              ],
            },
          ]}
        />
      </Undraggable>
    </div>
  );
}
