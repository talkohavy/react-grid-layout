import HorizontalLines from './HorizontalLines';
import VerticalLines from './VerticalLines';

type GridOverlayProps = {
  horizontalLinesCount: number;
  verticalLinesCount: number;
  rowHeight: number;
  height: number;
  color: string;
};

export default function GridOverlay(props: GridOverlayProps) {
  const { horizontalLinesCount, verticalLinesCount, rowHeight, height, color } = props;

  return (
    <>
      <VerticalLines verticalLinesCount={verticalLinesCount} height={height} color={color} />
      <HorizontalLines horizontalLinesCount={horizontalLinesCount} rowHeight={rowHeight} color={color} />
    </>
  );
}
