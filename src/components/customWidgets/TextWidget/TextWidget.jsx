import Undraggable from '../../dashboards/Widget/Undraggable';
import TopBar from '../TopBar';

export default function TextWidget(props) {
  const { dashboardId, widgetId, textContent, fontSize, fontWeight, textAlign, justifyContent, alignItems } = props;

  return (
    <div
      className='flex h-full animate-appear cursor-default border dark:bg-inherit'
      style={{ fontSize, fontWeight, textAlign, lineHeight: 'initial', justifyContent, alignItems }}
    >
      <TopBar dashboardId={dashboardId} widgetId={widgetId} />

      <Undraggable>{textContent}</Undraggable>
    </div>
  );
}
