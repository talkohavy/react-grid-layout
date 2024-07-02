import { type PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { type Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { DASHBOARD_DEFAULT_ROW_HEIGHT } from './constants';
import DashboardWrapper from './DashboardWrapper';
import GridOverlay from './GridOverlay';
import { getMergedDashboardSettings, runValidationsOnData } from './helpers';
import type { DashboardSettings, OnChangeLayoutProps, OnResizeOrDragStopProps } from './types';
import './dashboards.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = PropsWithChildren<{
  data: Array<Layout>;
  settings?: DashboardSettings;
  onLayoutChange?: (props: OnChangeLayoutProps) => void;
  className?: string;
}>;

export default function Dashboard(props: DashboardProps) {
  const { data, settings: settingsToMerge, children, onLayoutChange, className } = props;

  useMemo(() => runValidationsOnData(data), [data]);

  const dashboardRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const prevVerticalLinesHeight = useRef(0);
  const prevHorizontalLinesCount = useRef(0);

  const [isShowGridLines, setIsShowGridLines] = useState(false);
  const [horizontalLinesCount, setHorizontalLinesCount] = useState(0);
  const [verticalLinesHeight, setVerticalLinesHeight] = useState(0);

  const settings = useMemo(() => getMergedDashboardSettings({ settingsToMerge }), [settingsToMerge]);

  const onResizeOrDragStart = () => setIsShowGridLines(true);

  const onResizeOrDragStop = (props: OnResizeOrDragStopProps) => {
    const { newLayout, widgetBefore, widgetAfter } = props;
    setIsShowGridLines(false);

    const hasChanged = !isEqual(widgetBefore, widgetAfter);

    if (hasChanged) onLayoutChange?.({ newLayout, widgetBefore, widgetAfter });
  };

  const setHorizontalLinesCountAndVerticalLinesHeight = useCallback(
    ({ dashboardHeight = 0 }) => {
      const rowHeight = settings.dashboard.props.rowHeight ?? DASHBOARD_DEFAULT_ROW_HEIGHT;

      // Step 1: calculate verticalLinesHeight
      const newMaxHeight = Math.max(dashboardRef.current.clientHeight, dashboardHeight);
      const newVerticalLinesHeight = Math.floor(newMaxHeight / rowHeight) * rowHeight;
      if (prevVerticalLinesHeight.current === newVerticalLinesHeight) return;
      prevVerticalLinesHeight.current = newVerticalLinesHeight;

      // Step 2: calculate horizontalLinesCount from verticalLinesHeight
      const newHorizontalLinesCount = Math.ceil((newVerticalLinesHeight + 1) / rowHeight);
      if (prevHorizontalLinesCount.current === newHorizontalLinesCount) return;
      prevHorizontalLinesCount.current = newHorizontalLinesCount;

      setHorizontalLinesCount(newHorizontalLinesCount);
      setVerticalLinesHeight(newVerticalLinesHeight);
    },
    [settings.dashboard.props.rowHeight],
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const [{ borderBoxSize }] = entries as any;
      const [{ blockSize: dashboardHeight }] = borderBoxSize;
      setHorizontalLinesCountAndVerticalLinesHeight({ dashboardHeight });
    });

    observer.observe(dashboardRef.current);

    return () => observer.disconnect();
  }, [setHorizontalLinesCountAndVerticalLinesHeight]);

  const onDragCalculateVerticalGridLinesHeight = (newLayout: Array<Layout>) => {
    const rowHeight = settings.dashboard.props.rowHeight ?? DASHBOARD_DEFAULT_ROW_HEIGHT;

    const maxHeight = newLayout.reduce(
      /**
       * @param {number} maxHeight
       * @param {Layout} currentWidget
       */
      (maxHeight, currentWidget) => {
        const currentWidgetHeight = currentWidget.y + currentWidget.h;
        if (maxHeight < currentWidgetHeight) return currentWidgetHeight;

        return maxHeight;
      },
      0,
    );

    // Step 1: calculate verticalLine height
    const heightOfDashboardBoxWrapper = dashboardRef.current.clientHeight;
    const heightNeededForLowestWidget = maxHeight * rowHeight;
    const newVerticalLinesHeight = Math.max(heightNeededForLowestWidget, heightOfDashboardBoxWrapper);

    setVerticalLinesHeight(newVerticalLinesHeight);

    // Step 2: calculate horizontalLinesCount from verticalLinesHeight
    const newHorizontalLinesCount = Math.ceil((newVerticalLinesHeight + 1) / rowHeight);
    if (prevHorizontalLinesCount.current === newHorizontalLinesCount) return;
    prevHorizontalLinesCount.current = newHorizontalLinesCount;

    setHorizontalLinesCount(newHorizontalLinesCount);
  };

  return (
    <DashboardWrapper className={className} style={{ direction: 'ltr', padding: settings.dashboard.gapFromWalls }}>
      <div
        className='dashboard-grab-handler relative size-full overflow-auto'
        ref={dashboardRef}
        onScroll={setHorizontalLinesCountAndVerticalLinesHeight as any}
      >
        {(settings.grid.alwaysVisible || isShowGridLines) && (
          <GridOverlay
            {...settings.grid.props}
            rowHeight={settings.dashboard.props.rowHeight}
            horizontalLinesCount={horizontalLinesCount}
            height={verticalLinesHeight}
          />
        )}

        <ResponsiveGridLayout
          autoSize // If true, the container height swells and contracts to fit contents.
          draggableCancel='.do-not-drag-me' // <--- A CSS selector for tags that will not be draggable. If you forget the leading . it will not work. .react-resizable-handle is always prepended to this value.
          layouts={{ lg: data }}
          {...settings.dashboard.props}
          /**
           * @param {Array<Layout>} newLayout
           */
          onDragStart={(newLayout) => {
            onResizeOrDragStart();
            onDragCalculateVerticalGridLinesHeight(newLayout);
          }}
          /**
           * @param {Array<Layout>} newLayout
           */
          onResizeStart={(newLayout) => {
            onResizeOrDragStart();
            onDragCalculateVerticalGridLinesHeight(newLayout);
          }}
          /**
           * @param {Array<Layout>} newLayout
           * @param {Layout} widgetBefore
           * @param {Layout} widgetAfter
           */
          onDragStop={(newLayout, widgetBefore, widgetAfter) => {
            onResizeOrDragStop({ newLayout, widgetBefore, widgetAfter });
          }}
          /**
           * @param {Array<Layout>} newLayout
           * @param {Layout} widgetBefore
           * @param {Layout} widgetAfter
           */
          onResizeStop={(newLayout, widgetBefore, widgetAfter) => {
            onResizeOrDragStop({ newLayout, widgetBefore, widgetAfter });
            onDragCalculateVerticalGridLinesHeight(newLayout);
          }}
          onDrag={onDragCalculateVerticalGridLinesHeight}
          style={{ height: '100%' }} // <--- without this, react-grid-layout calculates a fixed value for the height based on highest stacked "tower" of widgets.
        >
          {children}
        </ResponsiveGridLayout>
      </div>
    </DashboardWrapper>
  );
}
