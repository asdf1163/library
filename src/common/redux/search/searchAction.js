import { bookListCreate } from "../../api/bookApi";
import {
  GET_DATA_QUERY,
  SUCCESS_DATA_QUERY,
  FAILED_DATA_QUERY,
} from "./searchType";

export const getDataQuery = () => {
  return {
    type: GET_DATA_QUERY,
  };
};

export const successDataQuery = (books) => {
  return {
    type: SUCCESS_DATA_QUERY,
    payload: books,
  };
};

export const failedDataQuery = (error) => {
  return {
    type: FAILED_DATA_QUERY,
    payload: error,
  };
};

// 
export const fetchSearchData = (query) => {
  return (dispatch) => {
    dispatch(getDataQuery())
    bookListCreate
      .get(query)
      .then((response) => {
        console.log(response);
        dispatch(successDataQuery(response));
      })
      .catch((error) => {
        console.log(error);
        const errorMsg = error.message;
        dispatch(failedDataQuery(errorMsg));
      });
  };
};
