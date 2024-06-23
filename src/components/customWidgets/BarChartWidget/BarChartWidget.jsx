import BarChart from '../../charts/BarChart';
import TopBar from '../TopBar';

export default function BarChartWidget(props) {
  const { id: widgetId } = props;
  console.log('BarChartWidget props is:', props);

  return (
    <div className='size-full'>
      <TopBar widgetId={widgetId} />

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
    </div>
  );
}
