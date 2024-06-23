/**
 * @typedef {import('../../../components/dashboards/types').IDashboard} IDashboard
 */

/**
 * @type {Array<import('react-grid-layout').Layout> }
 */
const dashboardData = [
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
  },
  // ------------------
  // Widget 2: BarChart
  // ------------------
  {
    i: 'aaa',
    w: 12,
    h: 4,
    x: 0,
    y: 2,
    minW: 2,
    minH: 2,
    static: false,
  },
  // -------------------
  // Widget 3: LineChart
  // -------------------
  {
    i: 'bbb',
    w: 12,
    h: 2,
    x: 12,
    y: 2,
    minW: 2,
    minH: 2,
    static: false,
  },
];

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
        columnCount: 12,
        rowHeight: 30,
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
