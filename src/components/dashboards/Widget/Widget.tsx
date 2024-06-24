import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type WidgetProps = PropsWithChildren<{
  gapBetweenWidgets?: number;
  className?: string;
}>;

export default function Widget(props: WidgetProps) {
  const { children, gapBetweenWidgets = 10, className } = props;

  return (
    <div className='flex size-full grow basis-[0%] bg-transparent' style={{ padding: gapBetweenWidgets }}>
      <div
        className={clsx(
          'relative flex size-full flex-col overflow-hidden rounded-md bg-slate-50 p-4 hover:bg-slate-100',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
