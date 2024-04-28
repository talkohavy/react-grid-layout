import React, { useMemo } from 'react';
import { GRID_COLOR } from '../constants';

export default function VerticalLines({ colsNumber, height, color = 'black' }) {
  const verticalLines = useMemo(() => Array.from(Array(colsNumber + 1).keys()), [colsNumber]);

  return (
    <div className='absolute m-auto flex h-full justify-between' style={{ width: '100%', left: 0, top: 0 }}>
      {verticalLines.map((_, index) => (
        <div
          key={`vertical-line-${index}`}
          className='h-full border-l-1 border-dashed'
          style={{ borderColor: color ?? GRID_COLOR, height: height + 20 }}
        />
      ))}
    </div>
  );
}
