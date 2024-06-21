import BarChartWidget from './BarChartWidget';
import { WidgetTypes } from './constants';
import LineChartWidget from './LineChartWidget';
import TextWidget from './TextWidget';

const widgetsMapper = {
  [WidgetTypes.BarChart]: BarChartWidget,
  [WidgetTypes.LineChart]: LineChartWidget,
  [WidgetTypes.Text]: TextWidget,
};

export { widgetsMapper };
