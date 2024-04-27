import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { areObjectsEqual } from '@talkohavy/lodash';
import DashboardGrid from './DashboardGrid';
import { getMergedDashboardSettings, keepLayoutPropsOnly } from './helpers';
import DashboardWidget from './Widget/DashboardWidget';
import './dashboards.css';

/**
 * @typedef {import('./types').Widget} Widget
 * @typedef {import('./types').DashboardSettings} DashboardSettings
 */

const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * @param {{
 *   data: Array<Widget>,
 *   settings?: DashboardSettings,
 *   onLayoutChange?: (props: {hasChanged: boolean, newLayout: any}) => void,
 *   className?: string,
 * }} props
 */
export default function Dashboard(props) {
  const { data, settings: settingsToMerge, onLayoutChange, className } = props;

  const dashboardRef = useRef();
  const previousLayoutState = useRef(keepLayoutPropsOnly(data));

  const [isShowGridLines, setIsShowGridLines] = useState(false);
  const [horizontalLinesCount, setHorizontalLinesCount] = useState(0);

  const onResizeOrDragStart = () => {
    setIsShowGridLines(true);
  };

  const onResizeOrDragStop = (props) => {
    setIsShowGridLines(false);

    const newLayoutState = keepLayoutPropsOnly(props);
    // @ts-ignore
    const hasChanged = !areObjectsEqual(newLayoutState, previousLayoutState.current);

    onLayoutChange?.({ hasChanged, newLayout: props });

    previousLayoutState.current = keepLayoutPropsOnly(props);
  };

  useEffect(() => {
    let prevHeight = 0;
    let prevHorizontalLinesCount = 0;
    if (dashboardRef) {
      const observer = new ResizeObserver((entries) => {
        const [{ borderBoxSize }] = entries;

        const newHeight = borderBoxSize[0].blockSize;
        if (prevHeight === newHeight) return;

        prevHeight = newHeight;

        const newHorizontalLinesCount = Math.ceil((newHeight + 1) / 50);
        if (prevHorizontalLinesCount === newHorizontalLinesCount) return;

        prevHorizontalLinesCount = newHorizontalLinesCount;

        setHorizontalLinesCount(newHorizontalLinesCount);
      });

      observer.observe(dashboardRef.current);

      return () => observer.disconnect();
    }
  }, []);

  const settings = useMemo(() => getMergedDashboardSettings({ settingsToMerge }), [settingsToMerge]);

  // It is recommended by react-grid-layout to memoize the children:
  const childrenMemoized = useMemo(
    () =>
      data.map((currentWidget) => {
        /** @type {any} */
        const widgetProps = currentWidget.props ?? {};
        widgetProps.id = currentWidget.i;

        return (
          <div key={widgetProps.id}>
            <DashboardWidget
              key={widgetProps.id}
              widgetProps={widgetProps}
              gapBetweenWidgets={settings.dashboard.gapBetweenWidgets}
            />
          </div>
        );
      }),
    [data, settings.dashboard.gapBetweenWidgets],
  );

  return (
    <div
      className={clsx('w-full overflow-auto rounded-lg border bg-gray-50 dark:bg-slate-900', className)}
      style={{ direction: 'ltr', padding: settings.dashboard.gapFromWalls }}
    >
      <div className='relative' ref={dashboardRef}>
        {(settings.grid.alwaysVisible || isShowGridLines) && (
          <DashboardGrid {...settings.grid.props} horizontalLinesCount={horizontalLinesCount} />
        )}

        <ResponsiveGridLayout
          autoSize // If true, the container height swells and contracts to fit contents.
          draggableCancel='.do-not-drag-me' // <--- A CSS selector for tags that will not be draggable. If you forget the leading . it will not work. .react-resizable-handle is always prepended to this value.
          layouts={{ lg: data }}
          {...settings.dashboard.props}
          onDragStart={onResizeOrDragStart}
          onDragStop={onResizeOrDragStop}
          onResizeStart={onResizeOrDragStart}
          onResizeStop={onResizeOrDragStop}
        >
          {childrenMemoized}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
