import clsx from 'clsx';

export default function Box({ className, children }) {
  return (
    <div
      className={clsx('rounded-md border border-neutral-300 bg-neutral-200 p-4 shadow-gray-500', className)} // <--- removed drop-shadow-md, and added my own filter
      style={{ filter: 'drop-shadow(0 2px 2px rgba(0.7,0.7,0.7,0.15))' }}
    >
      {children}
    </div>
  );
}
