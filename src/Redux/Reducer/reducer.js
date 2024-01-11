import {CHAT_DATA, PHONE_NUM,ACTIVE_USER_DATA, PHONE_NUM_DATA,USERDATA, CHAT} from '../action/actionType';

const initialState = {
  user: null,
  userData: null,
};

const reducer = (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case PHONE_NUM:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case CHAT_DATA:
      return {
        ...state,
        chatData: action.payload,
      };
    case PHONE_NUM_DATA:
      return {
        ...state,
        phoneNumberData: action.payload,
      };
    case ACTIVE_USER_DATA:
      return {
        ...state,
        activeUserData: action.payload,
      };
    case CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
