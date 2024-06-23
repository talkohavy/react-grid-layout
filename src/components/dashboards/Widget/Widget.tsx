import { PropsWithChildren } from 'react';

type WidgetProps = PropsWithChildren<{
  gapBetweenWidgets?: number;
}>;

export default function Widget(props: WidgetProps) {
  const { children, gapBetweenWidgets = 10 } = props;

  return (
    <div className='flex size-full grow basis-[0%] bg-transparent' style={{ padding: gapBetweenWidgets }}>
      <div className='relative flex size-full flex-col overflow-hidden rounded-md bg-slate-50 p-4 hover:bg-slate-100'>
        {children}
      </div>
    </div>
  );
}
