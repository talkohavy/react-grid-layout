import BaseWidget from '../BaseWidget';

export default function BarChartWidget({ widgetProps }) {
  // const {} = widgetProps;
  console.log('widgetProps is:', widgetProps);

  return (
    <BaseWidget className='cursor-move bg-white hover:bg-slate-100 dark:bg-[#383838]'>
      <div className='contents cursor-default'>
        <div>BarChart</div>
      </div>
    </BaseWidget>
  );
}
