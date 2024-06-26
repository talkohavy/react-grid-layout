import { v4 as uuid } from 'uuid';

/**
 * @typedef {import('react-grid-layout').Layout} Layout
 * @typedef {import('../../dashboards/types').LayoutProps} LayoutProps
 * @typedef {{
 *   id?: string,
 *   layoutProps?: LayoutProps
 * }} CreateNewWidgetLayoutProps
 */

/**
 * @param {CreateNewWidgetLayoutProps} props
 * @returns {Layout}
 */
function createNewWidgetLayout(props) {
  const { id, layoutProps } = props ?? {};

  return {
    i: id ?? uuid(),
    w: 4,
    h: 3,
    x: 0,
    y: 0,
    ...layoutProps,
  };
}

export { createNewWidgetLayout };
