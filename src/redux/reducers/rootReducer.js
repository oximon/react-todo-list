import { combineReducers } from 'redux';

import colorReducer from './color';
import listReducer from './list';
import taskReducer from './task';

const rootReducer = combineReducers({
  color: colorReducer,
  list: listReducer,
  task: taskReducer,
});

export default rootReducer;
