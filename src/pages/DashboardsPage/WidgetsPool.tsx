import { useDispatch, useSelector } from 'react-redux';
import { addWidgetToDashboardFlow, deleteWidgetFromWidgetsPoolFlow } from '../../store/slices/dashboards';
import { allWidgetsSelector, getDashboardByIdSelector } from '../../store/slices/dashboards/selectors';
import PlusIcon from '../../utils/svgs/PlusIcon';
import TrashIcon from '../../utils/svgs/TrashIcon';

/**
 * @param {{dashboardId: string}} props
 */
export default function WidgetsPool(props) {
  const { dashboardId } = props;

  const dispatch = useDispatch();
  const currentDashboard = useSelector(getDashboardByIdSelector(dashboardId));
  const widgets = useSelector(allWidgetsSelector);

  return (
    <div className='w-full'>
      <div className='my-4 text-xl font-bold'>Widgets Pool</div>

      <div className='size-full rounded-md border'>
        {widgets.map(({ id, type }) => (
          <div key={id} className='flex gap-10 border-b-1 p-4 [&:nth-child(odd)]:bg-neutral-50'>
            <div className='w-96'>{id}</div>

            <div className='w-44'>{type}</div>

            <button
              type='button'
              onClick={() => dispatch(addWidgetToDashboardFlow({ dashboardId, widgetId: id }))}
              className='flex size-6 items-center justify-center rounded-full border border-black bg-green-100 p-1 hover:bg-green-300 active:bg-green-400 disabled:cursor-default disabled:bg-gray-200'
              disabled={currentDashboard.data.some((widget) => widget.i === id)}
            >
              <PlusIcon className='fill-green-700' />
            </button>

            <button
              type='button'
              onClick={() => dispatch(deleteWidgetFromWidgetsPoolFlow({ widgetId: id }))}
              className='group flex size-6 items-center justify-center rounded-full p-1 hover:bg-red-400'
            >
              <TrashIcon className='fill-black group-hover:fill-white' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
