import { useMemo } from 'react';
import { DASHBOARD_DEFAULT_LINES_COLOR, DASHBOARD_DEFAULT_ROW_HEIGHT } from '../constants';

export default function HorizontalLines({ horizontalLinesCount, color }) {
  const horizontalLines = useMemo(() => {
    const howManyLines = Math.max(0, horizontalLinesCount - 1);

    return Array.from(Array(howManyLines).keys());
  }, [horizontalLinesCount]);

  return (
    <div className='absolute m-auto size-full'>
      {horizontalLines.map((_, index) => (
        <div
          key={`horizontal-line-${index}`}
          className='w-full border-b-1 border-dashed'
          style={{
            borderColor: color ?? DASHBOARD_DEFAULT_LINES_COLOR,
            height: DASHBOARD_DEFAULT_ROW_HEIGHT,
            borderTop: index === 0 ? `1px dashed ${color ?? DASHBOARD_DEFAULT_LINES_COLOR}` : undefined,
          }}
        />
      ))}
    </div>
  );
}
