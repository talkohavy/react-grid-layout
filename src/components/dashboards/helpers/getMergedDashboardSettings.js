/**
 * @typedef {import('../types').DashboardSettings} DashboardSettings
 * @typedef {import('../types').DashboardMergedSettings} DashboardMergedSettings
 */

import {
  BREAKPOINT_SIZES,
  COMPACT_TYPE,
  GAP_BETWEEN_WIDGETS,
  GRID_COLOR,
  GRID_COLUMN_COUNT,
  GRID_ROW_HEIGHT,
} from '../constants';

/**
 * @param {{
 *   settingsToMerge: DashboardSettings
 * }} props
 * @returns {DashboardMergedSettings}
 */
function getMergedDashboardSettings(props) {
  const { settingsToMerge } = props;
  const { dashboard, grid } = settingsToMerge ?? {};

  return {
    ...settingsToMerge,
    grid: {
      alwaysVisible: grid?.alwaysVisible ?? false,
      props: {
        color: grid?.color ?? GRID_COLOR,
      },
    },
    dashboard: {
      gapBetweenWidgets: dashboard?.gapBetweenWidgets ?? GAP_BETWEEN_WIDGETS,
      gapFromWalls: dashboard?.gapFromWalls ?? GAP_BETWEEN_WIDGETS,
      props: {
        isBounded: dashboard?.isBounded ?? true,
        breakpoints: { lg: BREAKPOINT_SIZES.lg },
        cols: { lg: GRID_COLUMN_COUNT },
        rowHeight: GRID_ROW_HEIGHT, // <--- defaults to 150
        compactType: COMPACT_TYPE[dashboard?.floatType ?? 'to-top'],
        allowOverlap: dashboard?.allowOverlap ?? false,
        // fixed values:
        margin: { lg: [0, 0] },
        containerPadding: [0, 0],
        resizeHandles: ['se'],
      },
    },
  };
}

export { getMergedDashboardSettings };
