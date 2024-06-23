import { createAction } from '@reduxjs/toolkit';
import { createActionString } from '../../helpers/createActionString';
import { name } from './reducer';

/**
 * @typedef {import('../../../components/dashboards/types').IWidget} IWidget
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
  /** @param {{dashboardId: string, widget: IWidget}} payload */
  (payload) => ({ payload }),
);

export { createNewWidgetFlow, removeWidgetFromDashboardFlow, updateDashboardFlow };
