import {
  GET_DATA_QUERY,
  UPDATE_QUERY_PARAMS,
  UPDATE_DATA_QUERY,
  SUCCESS_DATA_QUERY,
  FAILED_DATA_QUERY,
} from "./searchType";

export const initial = {
  isLoading: false,
  queryParams: { q: "*", startIndex: 0 },
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
    case UPDATE_QUERY_PARAMS:
      return {
        ...state,
        queryParams: {
          q: action.payload.q,
          startIndex: action.payload.startIndex,
        },
        books: state.books,
      };
    case UPDATE_DATA_QUERY:
      return {
        ...state,
        isLoading: false,
        books: [...state.books, ...action.payload],
        error: "",
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
        books: state.books,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
