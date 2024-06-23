import { createAction } from '@reduxjs/toolkit';
import { createActionString } from '../../helpers/createActionString';
import { name } from './reducer';

/** @typedef {import('./types').ApiRequest} ApiRequest */

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

export { removeWidgetFromDashboardFlow, updateDashboardFlow };
