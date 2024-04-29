import clsx from 'clsx';

/**
 * @param {import('react').PropsWithChildren<{
 *   className: string,
 *   style: any,
 * }>} props
 */
export default function DashboardCard(props) {
  const { className, style, children } = props;

  return (
    <div
      className={clsx('size-full overflow-auto rounded-lg border bg-gray-50 dark:bg-slate-900', className)}
      style={style}
    >
      {children}
    </div>
  );
}
