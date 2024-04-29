import HorizontalLines from './HorizontalLines';
import VerticalLines from './VerticalLines';

export default function DashboardGrid({ horizontalLinesCount, verticalLinesCount, height, color }) {
  return (
    <>
      <VerticalLines verticalLinesCount={verticalLinesCount} height={height} color={color} />
      <HorizontalLines horizontalLinesCount={horizontalLinesCount} color={color} />
    </>
  );
}
