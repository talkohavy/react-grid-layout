import { createSlice } from '@reduxjs/toolkit';
import { dashboards as dashboardsRaw, widgets as widgetsRaw } from '../../../pages/DashboardsPage/mockDatabase';

/**
 * @typedef {import('react-grid-layout').Layout} Layout
 * @typedef {import('../../../components/dashboards/types').IWidget} IWidget
 */

const name = 'dashboards';

const dashboards = JSON.parse(localStorage.getItem('dashboards')) ?? dashboardsRaw;
const widgets = JSON.parse(localStorage.getItem('widgets')) ?? widgetsRaw;

// NOTICE! The initialState is exported for testing purposes only (Unit Tests)
export const initialState = {
  dashboards,
  widgets,
};

const dashboardsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addWidgetToWidgetsPool:
      /**
       * @param {*} state
       * @param {import('@reduxjs/toolkit').PayloadAction<{ widget: IWidget }>} action
       */
      (state, action) => {
        state.widgets.push(action.payload.widget);
      },
    /**
     * @param {*} state
     * @param {import('@reduxjs/toolkit').PayloadAction<{ id: string }>} action
     */
    deleteWidgetFromWidgetsPool: (state, action) => {
      const { id } = action.payload;

      state.widgets = state.widgets.filter((widget) => widget.id !== id);
    },
    /**
     * @param {*} state
     * @param {import('@reduxjs/toolkit').PayloadAction<{ dashboardId: string, widget: Layout }>} action
     */
    addWidgetToDashboard: (state, action) => {
      const { dashboardId, widget } = action.payload;

      const dashboardToUpdate = state.dashboards.find((dashboard) => dashboard.id.toString() === dashboardId);

      dashboardToUpdate.data.push(widget);
    },
    /**
     * @param {*} state
     * @param {import('@reduxjs/toolkit').PayloadAction<{ dashboardId: string, widgetId: string }>} action
     */
    removeWidgetFromDashboard: (state, action) => {
      const { dashboardId, widgetId } = action.payload;

      const dashboardToUpdate = state.dashboards.find((dashboard) => dashboard.id.toString() === dashboardId);

      const dashboardWidgets = dashboardToUpdate.data.filter((widget) => widget.i !== widgetId);

      dashboardToUpdate.data = dashboardWidgets;
    },
    /**
     * @param {*} state
     * @param {import('@reduxjs/toolkit').PayloadAction<{ pinId: string; title: string }>} action
     */
    updateWidget: (state, action) => {
      const { pinId, title } = action.payload;

      const widget = state.widgets.find((widget) => widget.id === pinId);

      widget.props.title = title;
    },
    /**
     * @param {*} state
     * @param {import('@reduxjs/toolkit').PayloadAction<{ id: string, layout: Array<Layout> }>} action
     */
    updateDashboardLayout: (state, action) => {
      const { id, layout } = action.payload;

      const dashboardToUpdate = state.dashboards.find((currentDashboard) => currentDashboard.id === id);

      dashboardToUpdate.data = layout;
    },
    /**
     * @param {*} state
     * @param {import('@reduxjs/toolkit').PayloadAction<{ settings: any }>} action
     */
    updateDashboardSettings: (state, action) => {
      state.pinsDashboard.settings = action.payload.settings;
    },
  },
});

export const {
  addWidgetToDashboard,
  addWidgetToWidgetsPool,
  deleteWidgetFromWidgetsPool,
  removeWidgetFromDashboard,
  updateDashboardLayout,
  updateDashboardSettings,
} = dashboardsSlice.actions;
export { createSlice, name };
export const dashboardsReducer = dashboardsSlice.reducer;
