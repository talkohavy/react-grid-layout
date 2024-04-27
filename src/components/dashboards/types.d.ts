export type Dashboard = {
  /**
   * A dashboard's unique ID.
   */
  id: number | string;
  /**
   * A dashboard's display name.
   */
  name: string;
  createdAt: number | string;
  widgetsLayout: Array<Widget>;
};

export type DashboardMergedSettings = {
  grid: {
    alwaysVisible: boolean;
    props: {
      color: string;
    };
  };
  dashboard: {
    gapBetweenWidgets: number;
    gapFromWalls: number;
    props: {
      isBounded: boolean;
      breakpoints: any;
      compactType: 'vertical' | 'horizontal' | null;
      cols: any; // <--- defaults to 12. Number of columns in this layout.
      margin: any; // <--- I once used this to give margin between widgets, but today I do that by putting a padding on the BaseWidget component.
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
  };
  dashboard?: {
    /**
     * @default true
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
  };
};

export type Widget = {
  /**
   * **REQUIRED**
   *
   * A widget's unique ID.
   * react-grid-layout REQUIRES this param to:
   *
   * 1. exist
   * 2. be of type string
   * 3. be name exactly 'i'
   */
  i: string;
  /**
   * The widget's width
   */
  w: number;
  /**
   * The widget's height
   */
  h: number;
  /**
   * The X position, of the top left corner.
   */
  x: number;
  /**
   * The Y position, of the top left corner.
   */
  y: number;
  /**
   * If false, will not be draggable. Overrides `static`.
   * @default true
   */
  isDraggable?: boolean;
  /**
   * If false, will not be resizable. Overrides `static`.
   * @default true
   */
  isResizable?: boolean;
  /**
   * Setting this to `true` is equal to setting `isDraggable: false, isResizable: false`.
   * @default false
   */
  static?: boolean;
  /**
   * If set, cannot resize a widget to a width lower than this value.
   * @default 0
   */
  minW?: number;
  /**
   * If set, cannot resize a widget to a height lower than this value.
   * @default 0
   */
  minH?: number;
  /**
   * If set, cannot resize a widget to a width higher than this value.
   * @default Infinity
   */
  maxW?: number;
  /**
   * If set, cannot resize a widget to a height higher than this value.
   * @default Infinity
   */
  maxH?: number;
  /**
   * Every widget type has its own props which can be passed to it.
   */
  /**
   * If true and draggable, item will be moved only within grid.
   * @default false
   */
  isBounded?: boolean;
  props?: any;
};
