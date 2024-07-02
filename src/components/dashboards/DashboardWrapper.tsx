import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type DashboardCardProps = PropsWithChildren<{
  className?: string;
  style: any;
}>;

export default function DashboardWrapper(props: DashboardCardProps) {
  const { className, style, children } = props;

  return (
    <div className={clsx('size-full overflow-auto', className ?? 'rounded-lg border border-black')} style={style}>
      {children}
    </div>
  );
}
