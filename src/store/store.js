import { createLogger } from 'redux-logger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiFallbackReducer, fetchApiMiddleware } from './slices/api';
import { dashboardsMiddleware, dashboardsReducer } from './slices/dashboards';

/**
 * @typedef {import('@reduxjs/toolkit').Action} Action
 * @typedef {import('./types').State} State
 */

const reduxLogger = createLogger({
  // predicate: (getState, action) => !bannedActions.includes(action.type),
});

const rootReducer = combineReducers({
  dashboards: dashboardsReducer,
  apiFallback: apiFallbackReducer,
});

function getAllMiddlewares() {
  return [dashboardsMiddleware, fetchApiMiddleware];
}

/**
 * @param {{preloadedState?: Partial<any>}} props
 */
export function createStore({ preloadedState }) {
  const store = configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getAllMiddlewares();
      import.meta.env.MODE !== 'production' && middlewares.push(reduxLogger);
      return getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares);
    },
  });

  return store;
}
