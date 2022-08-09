import { SET_GLOBAL_STATE, SET_CLICKED_CARD_ID } from "./actionsTypes";

export const globalStateActionCreator = (payload) => ({
  type: SET_GLOBAL_STATE,
  payload: payload,
});

export const setClickedCardID = (payload) => ({
  type: SET_CLICKED_CARD_ID,
  payload: payload,
});

