import LineChart from '../../charts/LineChart';
import TopBar from '../TopBar';

/**
 * @param {{
 *   dashboardId: string,
 *   widgetId: string,
 *   onEditWidgetMenuItemClick: (widgetId: string) => void
 * }} props
 */
export default function LineChartWidget(props) {
  const { dashboardId, widgetId, onEditWidgetMenuItemClick } = props;

  return (
    <div className='size-full'>
      <TopBar dashboardId={dashboardId} widgetId={widgetId} onEditWidgetMenuItemClick={onEditWidgetMenuItemClick} />

      <LineChart
        lines={[
          {
            name: 'Line 1',
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
    </div>
  );
}
