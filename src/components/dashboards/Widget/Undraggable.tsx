import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type UndraggableProps = PropsWithChildren<{
  className?: string;
  style?: any;
}>;

export default function Undraggable(props: UndraggableProps) {
  const { children, className, style } = props;

  return (
    <div className={clsx('do-not-drag-me size-full cursor-default', className)} style={style}>
      {children}
    </div>
  );
}
