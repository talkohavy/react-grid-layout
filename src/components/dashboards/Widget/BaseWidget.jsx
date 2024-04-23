import React from 'react';
import clsx from 'clsx';
import Box from '../Box';

export default function BaseWidget({ className = '', header = null, children = null }) {
  return (
    <Box className={clsx('flex size-full flex-1 flex-col', className)}>
      {header && header}
      <div className='do-not-drag-me contents'>{children}</div>
    </Box>
  );
}
