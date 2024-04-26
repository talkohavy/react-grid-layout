import clsx from 'clsx';
import Box from '../Box';
import { GAP_BETWEEN_WIDGETS } from '../constants';

export default function BaseWidget({ className = '', header = null, children = null }) {
  return (
    <div className='flex size-full flex-1 cursor-move bg-transparent' style={{ padding: GAP_BETWEEN_WIDGETS }}>
      <Box
        className={clsx(
          'flex size-full flex-col overflow-hidden bg-white hover:bg-slate-100 dark:bg-[#383838]',
          className,
        )}
      >
        {header && header}
        <div className='do-not-drag-me contents'>{children}</div>
      </Box>
    </div>
  );
}
