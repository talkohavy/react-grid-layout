import { createAction } from '@reduxjs/toolkit';
import { createActionString } from '../../helpers/createActionString';
import { name } from './reducer';

/**
 * @typedef {import('react-grid-layout').Layout} Layout
 * @typedef {import('../../../components/dashboards/types').IWidget} IWidget
 * @typedef {import('../../../components/dashboards/types').LayoutProps} LayoutProps
 */

const customActionString = (actionString) => createActionString({ prefix: name, actionString });

const updateDashboardFlow = createAction(
  customActionString('Update Dashboard flow'),
  /** @param {{id: string, layout: Array<Layout>}} payload */
  (payload) => ({ payload }),
);

const removeWidgetFromDashboardFlow = createAction(
  customActionString('Remove Widget From Dashboard flow'),
  /** @param {{dashboardId: string, widgetId: string}} payload */
  (payload) => ({ payload }),
);

const createNewWidgetFlow = createAction(
  customActionString('Create new Widget flow'),
  /** @param {{dashboardId: string, widget: IWidget, layoutProps?: LayoutProps}} payload */
  (payload) => ({ payload }),
);

const addWidgetToDashboardFlow = createAction(
  customActionString('Add Widget to Dashboard flow'),
  /** @param {{dashboardId: string, widgetId: string}} payload */
  (payload) => ({ payload }),
);

const deleteWidgetFromWidgetsPoolFlow = createAction(
  customActionString('Delete Widget from pool flow'),
  /** @param {{widgetId: string}} payload */
  (payload) => ({ payload }),
);

const updateWidgetFlow = createAction(
  customActionString('Update Widget flow'),
  /** @param {{dashboardId: string, widgetId: string, type: string, props: any, layoutProps: LayoutProps}} payload */
  (payload) => ({ payload }),
);

export {
  addWidgetToDashboardFlow,
  createNewWidgetFlow,
  deleteWidgetFromWidgetsPoolFlow,
  removeWidgetFromDashboardFlow,
  updateDashboardFlow,
  updateWidgetFlow,
};
