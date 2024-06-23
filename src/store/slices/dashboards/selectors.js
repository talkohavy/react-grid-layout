export const allDashboardsSelector = (state) => state.dashboards.dashboards ?? [];

export const allWidgetsSelector = (state) => state.dashboards.widgets ?? [];

export const getDashboardByIdSelector = (id) => (state) =>
  state.dashboards.dashboards.find((dashboard) => id === dashboard.id.toString());

export const getDashboardDataSelector = (dashboardId) => (state) => {
  const { dashboards, widgets } = state.dashboards;

  const selectedDashboard = dashboards.find((currentDashboard) => currentDashboard.id.toString() === dashboardId);

  const { data: dashboardLayout } = selectedDashboard;

  const widgetsDataExtended = dashboardLayout.map((currentWidget) => {
    const foundWidget = widgets.find((widget) => currentWidget.i === widget.id);

    const extendedWidgetData = { ...currentWidget, props: foundWidget.props, type: foundWidget.type };

    return extendedWidgetData;
  });

  const extendedDashboardLayout = { ...selectedDashboard, data: widgetsDataExtended };

  return extendedDashboardLayout;
};

export const getWidgetByIdSelector = (id) => (state) => state.dashboards.widgets.find((widget) => id === widget.id);
