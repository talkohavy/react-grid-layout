import HorizontalLines from './HorizontalLines';
import VerticalLines from './VerticalLines';

export default function GridOverlay({ horizontalLinesCount, verticalLinesCount, rowHeight, height, color }) {
  return (
    <>
      <VerticalLines verticalLinesCount={verticalLinesCount} height={height} color={color} />
      <HorizontalLines horizontalLinesCount={horizontalLinesCount} rowHeight={rowHeight} color={color} />
    </>
  );
}
