import { v4 as uuid } from 'uuid';
import { createNewWidgetLayout } from '../../../components/customWidgets/helpers';
import { createMiddleware } from '../../helpers/createMiddleware';
import { createNewWidgetFlow, removeWidgetFromDashboardFlow, updateDashboardFlow } from './actions';
import {
  addWidgetToDashboard,
  addWidgetToWidgetsPool,
  name,
  removeWidgetFromDashboard,
  updateDashboardLayout,
} from './reducer';
import { allDashboardsSelector, allWidgetsSelector } from './selectors';

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

    if (createNewWidgetFlow.match(action)) {
      const { dashboardId, widget: widgetRaw } = action.payload;

      const newWidget = { id: uuid(), ...widgetRaw };

      dispatch(addWidgetToWidgetsPool({ widget: newWidget }));

      const newWidgetLayout = createNewWidgetLayout({ id: newWidget.id });

      dispatch(addWidgetToDashboard({ dashboardId, widget: newWidgetLayout }));

      const dashboards = allDashboardsSelector(getState());
      localStorage.setItem('dashboards', JSON.stringify(dashboards));
      const widgets = allWidgetsSelector(getState());
      localStorage.setItem('widgets', JSON.stringify(widgets));
    }
  },
});

export { dashboardsMiddleware };
