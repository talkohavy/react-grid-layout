import { Layout } from 'react-grid-layout';

export type DashboardMergedSettings = {
  grid: {
    alwaysVisible: boolean;
    props: {
      verticalLinesCount: number;
      color: string;
    };
  };
  dashboard: {
    gapBetweenWidgets: number;
    gapFromWalls: number;
    props: {
      isBounded: boolean;
      allowOverlap: boolean;
      breakpoints: any;
      compactType: 'vertical' | 'horizontal' | null;
      cols: any; // <--- defaults to 12. Number of columns in this layout.
      margin: any; // <--- I once used this to give margin between widgets, but today I do that by putting a padding on the Widget component.
      containerPadding: any;
      rowHeight: number;
      resizeHandles: Array<'se' | 'sw' | 'ne' | 'nw' | 'n' | 's' | 'e' | 'w'>;
    };
  };
};

export type DashboardSettings = {
  grid?: {
    /**
     * @default false
     */
    alwaysVisible?: boolean;
    /**
     * @default '#777'
     */
    color?: string;
    /**
     * @default 8
     */
    columnCount?: number;
    /**
     * row's height in pixels
     */
    rowHeight?: number;
  };
  dashboard?: {
    /**
     * @default false
     */
    isBounded?: boolean;
    /**
     * @default 10
     */
    gapBetweenWidgets?: number; // <--- when you change this, you'll need to manually change dashboard.css to position the drag/resize handlers.
    /**
     * @default 10
     */
    gapFromWalls?: number;
    /**
     * @default 'to-top'
     */
    floatType?: 'to-top' | 'to-left' | 'free-form';
    /**
     * If true, grid can be placed one over the other.
     * @default false
     */
    allowOverlap?: boolean;
  };
};

export type IDashboard = {
  settings?: DashboardSettings;
  /**
   * @description
   * A dashboard's data is an array of widgets.
   * It holds a mapping between a widget's id, to its position on the dashboard,
   * size, and other properties (like static or isResizable).
   */
  data: Array<Layout>;
};

export type IWidget = {
  id?: string;
  type: string;
  props: any;
};

export type OnChangeLayoutProps = {
  newLayout: Array<Layout>;
  widgetBefore: Layout;
  widgetAfter: Layout;
};

export type OnResizeOrDragStopProps = OnChangeLayoutProps;
