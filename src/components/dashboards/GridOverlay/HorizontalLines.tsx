import { useMemo } from 'react';
import { DASHBOARD_DEFAULT_LINES_COLOR } from '../constants';

type HorizontalLinesProps = {
  horizontalLinesCount: number;
  rowHeight: number;
  color: string;
};

export default function HorizontalLines(props: HorizontalLinesProps) {
  const { horizontalLinesCount, rowHeight, color } = props;

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
            height: rowHeight,
            borderTop: index === 0 ? `1px dashed ${color ?? DASHBOARD_DEFAULT_LINES_COLOR}` : undefined,
          }}
        />
      ))}
    </div>
  );
}
