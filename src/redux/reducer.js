import { SET_GLOBAL_STATE, SET_CLICKED_CARD_ID } from "./actionsTypes";

const initialState = {
  error: null,
  isLoaded: false,
  data: [],
  searchQuery: "",
  hashtagsArr: [],
  clickedCardID: '',
  route: '/'
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_STATE:
      return {
        ...state,
        data: action.payload,
      };

    case SET_CLICKED_CARD_ID:
      return {
        ...state,
        clickedCardID: action.payload,
        route: '/description',
      };

    default:
      return state;
  }
};
