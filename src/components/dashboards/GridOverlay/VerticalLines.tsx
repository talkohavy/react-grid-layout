import { useMemo } from 'react';
import { DASHBOARD_DEFAULT_LINES_COLOR } from '../constants';

export default function VerticalLines({ verticalLinesCount, height, color = 'black' }) {
  const verticalLines = useMemo(() => Array.from(Array(verticalLinesCount).keys()), [verticalLinesCount]);

  return (
    <div className='absolute m-auto flex size-full justify-between' style={{ left: 0, top: 0 }}>
      {verticalLines.map((_, index) => (
        <div
          key={`vertical-line-${index}`}
          className='h-full border-l-1 border-dashed'
          style={{ borderColor: color ?? DASHBOARD_DEFAULT_LINES_COLOR, height }}
        />
      ))}
    </div>
  );
}
