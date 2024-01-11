import useReducer from './reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  data: useReducer,
});
