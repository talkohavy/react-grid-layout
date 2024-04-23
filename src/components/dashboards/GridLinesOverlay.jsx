import React, { useMemo } from 'react';

function GridLinesOverlay({ colsNumber, margin = 0, color = 'black' }) {
  const lineElements = useMemo(() => {
    const gridLinesArr = [];
    for (let i = 0; i < colsNumber + 1; i++) {
      gridLinesArr.push(
        <div key={`gridLine${i}`} className='h-full border-l-1 border-dashed' style={{ borderColor: color }} />,
      );
    }

    return gridLinesArr;
  }, [colsNumber, color]);

  return (
    <div
      className='absolute m-auto flex h-full justify-between'
      style={{ width: `calc(100% + ${margin}px`, left: -0.5 * margin, top: 0, padding: 0 }}
    >
      {lineElements}
    </div>
  );
}

export default GridLinesOverlay;
