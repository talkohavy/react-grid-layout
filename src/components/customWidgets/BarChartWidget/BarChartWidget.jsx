import BarChart from '../../charts/BarChart';

export default function BarChartWidget() {
  return (
    <div className='size-full'>
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
