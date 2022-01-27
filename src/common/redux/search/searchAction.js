import { bookListCreate } from "../../api/bookApi";
import {
  GET_DATA_QUERY,
  UPDATE_DATA_QUERY,
  SUCCESS_DATA_QUERY,
  FAILED_DATA_QUERY,
} from "./searchType";

export const getDataQuery = () => {
  return {
    type: GET_DATA_QUERY,
  };
};

export const updateDataQuery = (books) => {
  return {
    type: UPDATE_DATA_QUERY,
    payload: books,
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

export const fetchSearchData = (query, type) => {
  return (dispatch) => {
    dispatch(getDataQuery())
    bookListCreate
      .get(query)
      .then((response) => {
        console.log(response.data.items);
        type === 'get'&& dispatch(successDataQuery(response.data.items));
        type === 'update'&& dispatch(updateDataQuery(response.data.items));
      })
      .catch((error) => {
        console.log(error);
        const errorMsg = error.message;
        dispatch(failedDataQuery(errorMsg));
      });
  };
};