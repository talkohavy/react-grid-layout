import { v4 as uuid } from 'uuid';
import { createNewWidgetLayout } from '../../../components/customWidgets/helpers';
import { toastError } from '../../../toaster';
import { createMiddleware } from '../../helpers/createMiddleware';
import {
  addWidgetToDashboardFlow,
  createNewWidgetFlow,
  deleteWidgetFromWidgetsPoolFlow,
  removeWidgetFromDashboardFlow,
  updateDashboardFlow,
} from './actions';
import {
  addWidgetToDashboard,
  addWidgetToWidgetsPool,
  deleteWidgetFromWidgetsPool,
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
      const { dashboardId, widget: widgetRaw, layoutProps } = action.payload;

      const newWidget = { id: uuid(), ...widgetRaw };

      dispatch(addWidgetToWidgetsPool({ widget: newWidget }));

      const newWidgetLayout = createNewWidgetLayout({ id: newWidget.id, layoutProps });

      dispatch(addWidgetToDashboard({ dashboardId, widget: newWidgetLayout }));

      const dashboards = allDashboardsSelector(getState());
      localStorage.setItem('dashboards', JSON.stringify(dashboards));
      const widgets = allWidgetsSelector(getState());
      localStorage.setItem('widgets', JSON.stringify(widgets));
    }

    if (addWidgetToDashboardFlow.match(action)) {
      const { dashboardId, widgetId } = action.payload;

      const widgetToAdd = allWidgetsSelector(getState()).find((widget) => widget.id === widgetId);

      const newWidgetLayout = createNewWidgetLayout({ id: widgetToAdd.id });

      dispatch(addWidgetToDashboard({ dashboardId, widget: newWidgetLayout }));

      const dashboards = allDashboardsSelector(getState());
      localStorage.setItem('dashboards', JSON.stringify(dashboards));
    }

    if (deleteWidgetFromWidgetsPoolFlow.match(action)) {
      const { widgetId } = action.payload;

      const dashboards = allDashboardsSelector(getState());
      const isWidgetBeingUsed = dashboards.some((currentDashboard) =>
        currentDashboard.data.some((currentWidget) => currentWidget.i === widgetId),
      );

      if (isWidgetBeingUsed) {
        toastError('Cannot delete widget that is being used on a dashboard');
      } else {
        dispatch(deleteWidgetFromWidgetsPool({ id: widgetId }));
      }
    }
  },
});

export { dashboardsMiddleware };
