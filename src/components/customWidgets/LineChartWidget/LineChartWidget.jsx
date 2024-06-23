import LineChart from '../../charts/LineChart';
import TopBar from '../TopBar';

export default function LineChartWidget(props) {
  const { id: widgetId } = props;

  return (
    <div className='size-full'>
      <TopBar widgetId={widgetId} />

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
