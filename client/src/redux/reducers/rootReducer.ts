import { combineReducers } from 'redux';
import { todoReducer } from './todoReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  todo: todoReducer,
  ui: uiReducer
});
