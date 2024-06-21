import clsx from 'clsx';

/**
 * @typedef {import('react').PropsWithChildren<{
 * className?: string;
 * style: any;
 * }>} DashboardCardProps
 */

/**
 * @param {DashboardCardProps} props
 */
export default function DashboardWrapper(props) {
  const { className, style, children } = props;

  return (
    <div className={clsx('size-full overflow-auto', className ?? 'rounded-lg border border-black')} style={style}>
      {children}
    </div>
  );
}
