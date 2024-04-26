import React, { useMemo } from 'react';
import { GRID_COLOR, GRID_ROW_HEIGHT } from '../constants';

export default function GridHorizontalLinesOverlay({ color = 'black' }) {
  const horizontalLines = useMemo(() => Array.from(Array(41).keys()), []);

  return (
    <div className='absolute m-auto size-full'>
      {horizontalLines.map((_, index) => (
        <div
          key={`horizontal-line-${index}`}
          className='m-auto border-t-1 border-dashed'
          style={{
            borderColor: color ?? GRID_COLOR,
            height: GRID_ROW_HEIGHT,
          }}
        />
      ))}
    </div>
  );
}
