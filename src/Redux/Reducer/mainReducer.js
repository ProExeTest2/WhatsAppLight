import {combineReducers} from 'redux';
import themeReducer from './themeReducer';
import reducer from './reducer';

export const rootReducer = combineReducers({
  data: reducer,
  data1: themeReducer,
});
