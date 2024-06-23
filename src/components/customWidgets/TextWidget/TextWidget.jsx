import Undraggable from '../../dashboards/Widget/Undraggable';
import TopBar from '../TopBar';

/**
 * @param {{
 *   dashboardId: string,
 *   widgetId: string,
 *   textContent: string,
 *   fontSize: number,
 *   fontWeight: string,
 *   textAlign: string,
 *   justifyContent: string,
 *   alignItems: string
 * }} props
 */
export default function TextWidget(props) {
  const { dashboardId, widgetId, textContent, fontSize, fontWeight, textAlign, justifyContent, alignItems } = props;

  return (
    <div className='flex h-full animate-appear cursor-default border dark:bg-inherit'>
      <TopBar dashboardId={dashboardId} widgetId={widgetId} />

      <Undraggable style={{ fontSize, fontWeight, textAlign, lineHeight: 'initial', justifyContent, alignItems }}>
        {textContent}
      </Undraggable>
    </div>
  );
}
