import BarChartWidget from './BarChartWidget/Renderer';
import LineChartWidget from './LineChartWidget/Renderer';
import TextWidget from './TextWidget/Renderer';

const widgetsMapper = {
  LineChart: { renderer: LineChartWidget },
  BarChart: { renderer: BarChartWidget },
  Text: { renderer: TextWidget },
};

export { widgetsMapper };
