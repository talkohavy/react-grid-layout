import { useState } from 'react';
import clsx from 'clsx';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { BREAKPOINT_SIZES, GRID_COLUMN_COUNT, GRID_ROW_HEIGHT, MARGIN_BETWEEN_WIDGETS } from './constants';
import GridLinesOverlay from './GridLinesOverlay';
import DashboardWidget from './Widget/DashboardWidget';

/**
 * @typedef {import('./types').Widget} Widget
 */

const ResponsiveGridLayout = WidthProvider(Responsive);

/** @param {{ data: Array<Widget>, className?: string }} props */
export default function Dashboard({ data, className }) {
  const [isShowGridLines, setIsShowGridLines] = useState(false);

  const onResizeOrDragStart = () => setIsShowGridLines(true);
  const onResizeOrDragStop = () => setIsShowGridLines(false);

  return (
    <div
      className={clsx('w-full overflow-auto rounded-lg border bg-gray-50 p-2 dark:bg-slate-900', className)}
      style={{ direction: 'ltr' }}
    >
      <div className='relative'>
        {isShowGridLines && (
          <GridLinesOverlay colsNumber={GRID_COLUMN_COUNT} margin={MARGIN_BETWEEN_WIDGETS} color='#999' />
        )}
        <ResponsiveGridLayout
          autoSize // If true, the container height swells and contracts to fit contents.
          layouts={{ lg: data }}
          breakpoints={{ lg: BREAKPOINT_SIZES.lg }}
          cols={{ lg: GRID_COLUMN_COUNT }} // <--- defaults to 12. Number of columns in this layout.
          margin={{ lg: [MARGIN_BETWEEN_WIDGETS, MARGIN_BETWEEN_WIDGETS] }}
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
