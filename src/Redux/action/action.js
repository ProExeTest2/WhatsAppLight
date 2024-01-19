import {CHAT_DATA,ACTIVE_USER_DATA, PHONE_NUM,PHONE_NUM_DATA, USERDATA, CHAT, STATUS_DATA, THEME} from './actionType';

export const setNumber = user => ({
  type: PHONE_NUM,
  payload: user,
});
export const setNumberData = user => ({
  type: PHONE_NUM_DATA,
  payload: user,
});
export const userData = user => ({
  type: USERDATA,
  payload: user,
});
export const chatData = user => ({
  type: CHAT_DATA,
  payload: user,
});
export const activeUserData = user => ({
  type: ACTIVE_USER_DATA,
  payload: user,
});
export const chat = user => ({
  type: CHAT,
  payload: user,
});
export const statusData = user => ({
  type: STATUS_DATA,
  payload: user,
});
export const theme = user => ({
  type: THEME,
  payload: user,
});
