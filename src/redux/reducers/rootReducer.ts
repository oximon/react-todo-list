import { combineReducers } from 'redux';

import colorReducer from './color';
import listReducer from './list';
import taskReducer from './task';

export const rootReducer = combineReducers({
  color: colorReducer,
  list: listReducer,
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
