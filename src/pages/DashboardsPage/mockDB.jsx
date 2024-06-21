import { exampleWidgetsData } from '../exampleWidgetsData';

/**
 * @type {Array<import('../../components/dashboards/types').IWidgetLayout> }
 */
const dashboardData = [
  // --------------------
  // Widget 1: TextWidget
  // --------------------
  {
    i: 'ccc',
    type: 'Text',
    w: 6,
    h: 2,
    x: 9,
    y: 0,
    static: false,
    props: {
      type: 'Text',
      textContent: 'This text is big!',
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  // ------------------
  // Widget 2: BarChart
  // ------------------
  {
    i: 'aaa',
    type: 'BarChart',
    w: 12,
    h: 4,
    x: 0,
    y: 2,
    minW: 2,
    minH: 2,
    static: false,
    props: {
      type: 'BarChart',
      title: 'Country - Money Per Capita',
      subtitle: 'This is the subtitle',
      legendTitleText: '',
      description: 'lorem ipsum dolor',
      ...exampleWidgetsData.barChart,
    },
  },
  // -------------------
  // Widget 3: LineChart
  // -------------------
  {
    i: 'bbb',
    type: 'LineChart',
    w: 12,
    h: 2,
    x: 12,
    y: 2,
    minW: 2,
    minH: 2,
    static: false,
    props: {
      type: 'LineChart',
      title: 'My Awesome Chart',
      subtitle: 'It really whips the lammas ass',
      xAxisLabel: 'amount of x (millions)',
      yAxisLabel: 'amount of y (ms)',
      legendTitleText: '',
      tooltipValueSuffix: 'cm',
      description: 'lorem ipsum dolor',
      isLoading: false,
      ...exampleWidgetsData.lineChart,
    },
  },
];

/**
 * @typedef {import('../../components/dashboards/types').IDashboard} IDashboard
 */

/**
 * @type {Array<IDashboard>}
 */
export const dashboards = [
  {
    id: 1,
    title: 'Demo Dashboard',
    createdAt: '2023-04-24T02:59:55Z',
    settings: {
      grid: {
        color: '#ccc',
        // alwaysVisible: true,
      },
      dashboard: {
        gapBetweenWidgets: 0,
        gapFromWalls: 0,
        // allowOverlap: true,
        floatType: 'free-form',
      },
    },
    data: dashboardData,
  },
  {
    id: 2,
    title: 'Demo Dashboard 2',
    settings: {
      grid: {
        color: '#ccc',
        alwaysVisible: true,
      },
      dashboard: {
        gapBetweenWidgets: 5,
        gapFromWalls: 4,
        // allowOverlap: true,
        // floatType: 'free-form',
      },
    },
    data: dashboardData,
    createdAt: '2023-05-24T02:59:55Z',
  },
  {
    id: 3,
    title: 'Demo Dashboard 3',
    data: [],
    createdAt: '2023-06-24T02:59:55Z',
  },
];
