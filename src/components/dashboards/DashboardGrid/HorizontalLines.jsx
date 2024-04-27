import React, { useMemo } from 'react';
import { GRID_COLOR, GRID_ROW_HEIGHT } from '../constants';

export default function GridHorizontalLinesOverlay({ horizontalLinesCount, color = 'black' }) {
  const horizontalLines = useMemo(() => {
    const howManyLines = Math.max(0, horizontalLinesCount - 1);

    return Array.from(Array(howManyLines).keys());
  }, [horizontalLinesCount]);

  return (
    <div className='absolute m-auto size-full'>
      {horizontalLines.map((_, index) => (
        <div
          key={`horizontal-line-${index}`}
          className='m-auto border-b-1 border-dashed'
          style={{
            borderColor: color ?? GRID_COLOR,
            height: GRID_ROW_HEIGHT,
            borderTop: index === 0 ? '1px dashed' : undefined,
          }}
        />
      ))}
    </div>
  );
}
