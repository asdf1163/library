import {
  GET_DATA_QUERY,
  SUCCESS_DATA_QUERY,
  FAILED_DATA_QUERY,
} from "./searchType";

const initial = {
  isLoading: false,
  books: [],
  error: "",
};

export const searchReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_DATA_QUERY:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_DATA_QUERY:
      return {
        isLoading: false,
        books: action.payload,
        error: "",
      };
    case FAILED_DATA_QUERY:
      return {
        isLoading: false,
        // books: [],
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
