import { SET_TOAST_MESSAGE, SET_LOADING, SET_PLACE } from "../actions/types";

const init = {
  isLoading: false,
  toastMessage: "",
  place: {}
};

const metaReducer = (state = init, action) => {
  switch (action.type) {
    case SET_TOAST_MESSAGE: {
      return {
        ...state,
        toastMessage: action.payload.toastMessage
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
    }
    case SET_PLACE: {
      return {
        ...state,
        place: action.payload.place
      };
    }
    default:
      return state;
  }
};

export default metaReducer;
