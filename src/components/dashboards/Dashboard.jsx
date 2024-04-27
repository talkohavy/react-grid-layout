import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { BREAKPOINT_SIZES, GAP_FROM_WALLS, GRID_COLUMN_COUNT, GRID_ROW_HEIGHT } from './constants';
import DashboardGrid from './DashboardGrid';
import DashboardWidget from './Widget/DashboardWidget';
import './dashboards.css';

/**
 * @typedef {import('./types').Widget} Widget
 */

const ResponsiveGridLayout = WidthProvider(Responsive);

/** @param {{ data: Array<Widget>, className?: string }} props */
export default function Dashboard({ data, className }) {
  const dashboardRef = useRef();

  const [isShowGridLines, setIsShowGridLines] = useState(false);
  const [horizontalLinesCount, setHorizontalLinesCount] = useState(0);

  const onResizeOrDragStart = () => setIsShowGridLines(true);
  const onResizeOrDragStop = () => setIsShowGridLines(false);

  // eslint-disable-next-line
  const dashboardSettings = useMemo(() => {
    // getSettings()
    // eslint-disable-next-line
    const a = 1;
    return {
      grid: {
        show: true,
        color: 'black',
      },
    };
  }, []);

  useEffect(() => {
    let prevHeight = 0;
    let prevHorizontalLinesCount = 0;
    let sameHeightCases = 0;
    let sameLineCountCases = 0;
    let LineCountChangedCases = 0;
    if (dashboardRef) {
      const observer = new ResizeObserver((entries) => {
        console.log('sameHeightCases is:', sameHeightCases);
        console.log('sameLineCountCases is:', sameLineCountCases);
        console.log('LineCountChangedCases is:', LineCountChangedCases);
        console.log('-----------------------------');
        const [{ borderBoxSize }] = entries;

        const newHeight = borderBoxSize[0].blockSize;
        if (prevHeight === newHeight) {
          sameHeightCases++;
          return;
        }
        prevHeight = newHeight;

        const newHorizontalLinesCount = Math.ceil(newHeight / 50);
        if (prevHorizontalLinesCount === newHorizontalLinesCount) {
          sameLineCountCases++;
          return;
        }
        prevHorizontalLinesCount = newHorizontalLinesCount;
        LineCountChangedCases++;

        setHorizontalLinesCount(newHorizontalLinesCount);
      });

      observer.observe(dashboardRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      className={clsx('w-full overflow-auto rounded-lg border bg-gray-50 dark:bg-slate-900', className)}
      style={{ direction: 'ltr', padding: GAP_FROM_WALLS }}
    >
      <div className='relative' ref={dashboardRef}>
        {!isShowGridLines && <DashboardGrid color='black' horizontalLinesCount={horizontalLinesCount} />}

        <ResponsiveGridLayout
          autoSize // If true, the container height swells and contracts to fit contents.
          layouts={{ lg: data }}
          breakpoints={{ lg: BREAKPOINT_SIZES.lg }}
          cols={{ lg: GRID_COLUMN_COUNT }} // <--- defaults to 12. Number of columns in this layout.
          margin={{ lg: [0, 0] }} // <--- I once used this to give margin between widgets, but today I do that by putting a padding on the BaseWidget component.
          draggableCancel='.do-not-drag-me' // <--- A CSS selector for tags that will not be draggable. If you forget the leading . it will not work. .react-resizable-handle is always prepended to this value.
          containerPadding={[0, 0]}
          isBounded
          resizeHandles={['se']}
          rowHeight={GRID_ROW_HEIGHT}
          onDragStart={onResizeOrDragStart}
          onDragStop={onResizeOrDragStop}
          onResizeStart={onResizeOrDragStart}
          onResizeStop={onResizeOrDragStop}
        >
          {data.map((currentWidget) => {
            /** @type {any} */
            const widgetProps = currentWidget.props ?? {};
            widgetProps.id = currentWidget.i;

            return (
              <div key={widgetProps.id}>
                <DashboardWidget key={widgetProps.id} widgetProps={widgetProps} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
