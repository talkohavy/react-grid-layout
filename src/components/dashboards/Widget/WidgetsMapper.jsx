import BarChartWidget from './BarChartWidget/BarChartWidget';
import LineChartWidget from './LineChartWidget/LineChartWidget';
import TextWidget from './TextWidget/TextWidget';

const widgetsMapper = {
  LineChart: LineChartWidget,
  BarChart: BarChartWidget,
  Text: TextWidget,
};

export { widgetsMapper };
