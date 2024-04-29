import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { areObjectsEqual } from '@talkohavy/lodash';
import { GRID_ROW_HEIGHT } from './constants';
import DashboardCard from './DashboardCard';
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
  const prevVerticalLinesHeight = useRef(0);
  const prevHorizontalLinesCount = useRef(0);
  const previousLayoutState = useRef(keepLayoutPropsOnly(data));

  const [isShowGridLines, setIsShowGridLines] = useState(false);
  const [horizontalLinesCount, setHorizontalLinesCount] = useState(0);
  const [verticalLinesHeight, setVerticalLinesHeight] = useState(0);

  const settings = useMemo(() => getMergedDashboardSettings({ settingsToMerge }), [settingsToMerge]);

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

  const setHorizontalLinesCountAndVerticalLinesHeight = useCallback(({ boxHeight = 0 }) => {
    // Step 1: calculate verticalLinesHeight
    // @ts-ignore
    const newMaxHeight = Math.max(dashboardRef.current.clientHeight, boxHeight);
    const newVerticalLinesHeight = Math.floor(newMaxHeight / GRID_ROW_HEIGHT) * GRID_ROW_HEIGHT;
    if (prevVerticalLinesHeight.current === newVerticalLinesHeight) return;
    prevVerticalLinesHeight.current = newVerticalLinesHeight;

    // Step 2: calculate horizontalLinesCount from verticalLinesHeight
    const newHorizontalLinesCount = Math.ceil((newVerticalLinesHeight + 1) / GRID_ROW_HEIGHT);
    if (prevHorizontalLinesCount.current === newHorizontalLinesCount) return;
    prevHorizontalLinesCount.current = newHorizontalLinesCount;

    setHorizontalLinesCount(newHorizontalLinesCount);
    setVerticalLinesHeight(newVerticalLinesHeight);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const [{ borderBoxSize }] = entries;
      const boxHeight = borderBoxSize[0].blockSize;
      setHorizontalLinesCountAndVerticalLinesHeight({ boxHeight });
    });

    observer.observe(dashboardRef.current);

    return () => observer.disconnect();
  }, [setHorizontalLinesCountAndVerticalLinesHeight]);

  const onDragCalculateVerticalGridLinesHeight = (layout) => {
    const maxHeight = layout.reduce((maxHeight, currentWidget) => {
      const currentWidgetHeight = currentWidget.y + currentWidget.h;
      if (maxHeight < currentWidgetHeight) return currentWidgetHeight;

      return maxHeight;
    }, 0);

    // @ts-ignore
    const heightOfDashboardBoxWrapper = dashboardRef.current.clientHeight;
    const heightNeededForLowestWidget = maxHeight * GRID_ROW_HEIGHT;
    const newVerticalLinesHeight = Math.max(heightNeededForLowestWidget, heightOfDashboardBoxWrapper);

    setVerticalLinesHeight(newVerticalLinesHeight);

    // Step 2: calculate horizontalLinesCount from verticalLinesHeight
    const newHorizontalLinesCount = Math.ceil((newVerticalLinesHeight + 1) / GRID_ROW_HEIGHT);
    if (prevHorizontalLinesCount.current === newHorizontalLinesCount) return;
    prevHorizontalLinesCount.current = newHorizontalLinesCount;

    setHorizontalLinesCount(newHorizontalLinesCount);
  };

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
    <DashboardCard className={className} style={{ direction: 'ltr', padding: settings.dashboard.gapFromWalls }}>
      <div
        className='dashboard-grab-handler relative size-full overflow-auto'
        ref={dashboardRef}
        // @ts-ignore
        onScroll={setHorizontalLinesCountAndVerticalLinesHeight}
      >
        {(settings.grid.alwaysVisible || isShowGridLines) && (
          <DashboardGrid
            {...settings.grid.props}
            horizontalLinesCount={horizontalLinesCount}
            height={verticalLinesHeight}
          />
        )}

        <ResponsiveGridLayout
          autoSize // If true, the container height swells and contracts to fit contents.
          draggableCancel='.do-not-drag-me' // <--- A CSS selector for tags that will not be draggable. If you forget the leading . it will not work. .react-resizable-handle is always prepended to this value.
          layouts={{ lg: data }}
          {...settings.dashboard.props}
          onDragStart={(layout) => {
            onResizeOrDragStart();
            onDragCalculateVerticalGridLinesHeight(layout);
          }}
          onDragStop={onResizeOrDragStop}
          onResizeStart={(layout) => {
            onResizeOrDragStart();
            onDragCalculateVerticalGridLinesHeight(layout);
          }}
          onResizeStop={(layout) => {
            onResizeOrDragStop(layout);
            onDragCalculateVerticalGridLinesHeight(layout);
          }}
          onDrag={onDragCalculateVerticalGridLinesHeight}
          style={{ height: '100%' }} // <--- without this, react-grid-layout calculates a fixed value for the height based on highest stacked "tower" of widgets.
        >
          {childrenMemoized}
        </ResponsiveGridLayout>
      </div>
    </DashboardCard>
  );
}
