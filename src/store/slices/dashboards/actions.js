import { createAction } from '@reduxjs/toolkit';
import { createActionString } from '../../helpers/createActionString';
import { name } from './reducer';

/**
 * @typedef {import('../../../components/dashboards/types').IWidget} IWidget
 * @typedef {import('../../../components/dashboards/types').LayoutProps} LayoutProps
 */

const customActionString = (actionString) => createActionString({ prefix: name, actionString });

const updateDashboardFlow = createAction(
  customActionString('Update Dashboard'),
  /** @param {{id: string, layout: any}} payload */
  (payload) => ({ payload }),
);

const removeWidgetFromDashboardFlow = createAction(
  customActionString('Remove Widget From Dashboard'),
  /** @param {{dashboardId: string, widgetId: string}} payload */
  (payload) => ({ payload }),
);

const createNewWidgetFlow = createAction(
  customActionString('Create new Widget'),
  /** @param {{dashboardId: string, widget: IWidget, layoutProps?: LayoutProps}} payload */
  (payload) => ({ payload }),
);

const addWidgetToDashboardFlow = createAction(
  customActionString('Add Widget to Dashboard'),
  /** @param {{dashboardId: string, widgetId: string}} payload */
  (payload) => ({ payload }),
);

const deleteWidgetFromWidgetsPoolFlow = createAction(
  customActionString('Delete Widget from pool'),
  /** @param {{widgetId: string}} payload */
  (payload) => ({ payload }),
);

export {
  addWidgetToDashboardFlow,
  createNewWidgetFlow,
  deleteWidgetFromWidgetsPoolFlow,
  removeWidgetFromDashboardFlow,
  updateDashboardFlow,
};
