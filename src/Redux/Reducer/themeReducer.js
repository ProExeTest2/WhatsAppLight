import { darakMode, lightMode } from '../../helper/colorHelper';
import {CHAT_DATA, PHONE_NUM,ACTIVE_USER_DATA, PHONE_NUM_DATA,USERDATA, CHAT, THEME} from '../action/actionType';

const initialState = {
    isdarkMode:'false',
    iscolorMode: lightMode
  
};

const themeReducer = (state = initialState, action) => {
  // console.log('action', action)
  switch (action.type) {
      case THEME:
        console.log(action.payload);
      return {
        ...state,
        isdarkMode :action?.payload,
        iscolorMode: action.payload ==='true' ? darakMode: lightMode,
      };
    default:
      return state;
  }
};

export default themeReducer;

