import { exampleWidgetsData } from '../../components/dashboards/exampleWidgetsData';

/**
 * @typedef {import('../../components/dashboards/types').Dashboard} Dashboard
 */

/**
 * @type {Array<Dashboard>}
 */
export const mockData = [
  {
    id: 1,
    name: 'Demo Dashboard',
    createdAt: '2023-04-24T02:59:55Z',
    widgetsLayout: [
      // --------------------
      // Widget 1: TextWidget
      // --------------------
      {
        i: 'ccc',
        w: 6,
        h: 2,
        x: 9,
        y: 0,
        static: false,
        props: {
          type: 'Text',
          textContent: 'This text is big!',
          fontSize: 36,
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
        w: 12,
        h: 9,
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
        w: 12,
        h: 9,
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
    ],
  },
  // {
  //   id: 2,
  //   name: 'Demo Dashboard 2',
  //   createdAt: '2023-05-24T02:59:55Z',
  // },
  // {
  //   id: 3,
  //   name: 'Demo Dashboard 3',
  //   createdAt: '2023-06-24T02:59:55Z',
  // },
];
