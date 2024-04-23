import clsx from 'clsx';

export default function Box({ className, children }) {
  return (
    <div
      className={clsx(
        'rounded-md border border-neutral-300 bg-neutral-200 p-4 shadow-gray-500 drop-shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
