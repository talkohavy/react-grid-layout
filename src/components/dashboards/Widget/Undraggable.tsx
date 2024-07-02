import clsx from 'clsx';

/**
 * @param {import('react').PropsWithChildren<{
 *   className?: string,
 *   style?: any
 * }>} props
 */
export default function Undraggable(props) {
  const { children, className, style } = props;

  return (
    <div className={clsx('do-not-drag-me size-full cursor-default', className)} style={style}>
      {children}
    </div>
  );
}
