import { createMiddleware } from '../../helpers/createMiddleware';
import { removeWidgetFromDashboardFlow, updateDashboardFlow } from './actions';
import { name, removeWidgetFromDashboard, updateDashboardLayout } from './reducer';
import { allDashboardsSelector } from './selectors';

/** @param {{ axiosInstance: import('axios').AxiosInstance }} props */
const dashboardsMiddleware = createMiddleware({
  uniquePrefix: name,
  handleAction: ({ action, dispatch, getState }) => {
    if (updateDashboardFlow.match(action)) {
      const { id, layout } = action.payload;

      dispatch(updateDashboardLayout({ id, layout }));

      const dashboards = allDashboardsSelector(getState());
      localStorage.setItem('dashboards', JSON.stringify(dashboards));
    }

    if (removeWidgetFromDashboardFlow.match(action)) {
      const { dashboardId, widgetId } = action.payload;

      dispatch(removeWidgetFromDashboard({ dashboardId, widgetId }));

      const dashboards = allDashboardsSelector(getState());
      localStorage.setItem('dashboards', JSON.stringify(dashboards));
    }
  },
});

export { dashboardsMiddleware };
