import { GRID_COLUMN_COUNT } from '../constants';
import HorizontalLines from './HorizontalLines';
import VerticalLines from './VerticalLines';

export default function DashboardGrid({ color }) {
  return (
    <>
      <VerticalLines colsNumber={GRID_COLUMN_COUNT} color={color} />
      <HorizontalLines color={color} />
    </>
  );
}
