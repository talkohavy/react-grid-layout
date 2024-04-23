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
   * Is the widget static? `false` means it can be resized.
   * @default '??'
   */
  static?: boolean;
  /**
   * If set, cannot resize a widget to a width lower than this value.
   * @default '??'
   */
  minW?: number;
  /**
   * If set, cannot resize a widget to a height lower than this value.
   * @default '??'
   */
  minH?: number;
  /**
   * Every widget type has its own props which can be passed to it.
   */
  props?: any;
};
