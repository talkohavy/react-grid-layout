import { v4 as uuid } from 'uuid';

/**
 * @typedef {{id?: string}} CreateNewWidgetLayoutProps
 * @typedef {import('react-grid-layout').Layout} Layout
 */

/**
 * @param {CreateNewWidgetLayoutProps} props
 * @returns {Layout}
 */
function createNewWidgetLayout(props) {
  const { id } = props ?? {};

  return {
    i: id ?? uuid(),
    isResizable: false,
    w: 4,
    h: 3,
    x: 0,
    y: 0,
  };
}

export { createNewWidgetLayout };
