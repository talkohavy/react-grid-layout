import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { DASHBOARD_DEFAULT_RESIZE_HANDLERS } from '../constants';
import FakeResizeHandle from '../FakeResizeHandle';
import type { HandlerPositions } from '../types';

type WidgetProps = PropsWithChildren<{
  gapBetweenWidgets?: number;
  axisHandlerPositions?: Array<HandlerPositions>;
  className?: string;
}>;

export default function Widget(props: WidgetProps) {
  const {
    children,
    gapBetweenWidgets = 10,
    axisHandlerPositions = DASHBOARD_DEFAULT_RESIZE_HANDLERS,
    className,
  } = props;

  return (
    <div className='box-border flex size-full bg-transparent' style={{ padding: gapBetweenWidgets }}>
      <div
        className={clsx(
          'relative box-border flex size-full flex-col overflow-hidden rounded-md bg-slate-50 p-4 hover:bg-slate-100',
          className,
        )}
      >
        {children}

        {axisHandlerPositions.map((position) => (
          <FakeResizeHandle key={position} handleAxis={position} />
        ))}
      </div>
    </div>
  );
}
