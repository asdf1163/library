import { bookListCreate } from "../../api/bookApi";
import {
  GET_DATA_QUERY,
  UPDATE_QUERY_PARAMS,
  UPDATE_DATA_QUERY,
  SUCCESS_DATA_QUERY,
  FAILED_DATA_QUERY,
} from "./searchType";

export const getDataQuery = () => {
  return {
    type: GET_DATA_QUERY,
  };
};

export const updateQueryParams = (params) => {
  return {
    type: UPDATE_QUERY_PARAMS,
    payload: params,
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

export const fetchSearchData = (type) => {
  return (dispatch, getState) => {
    const { q, startIndex } = getState().searchList.queryParams;
    dispatch(getDataQuery());
    const query = `?q=${q}&startIndex=${startIndex}`;
    bookListCreate({
      method: "get",
      url: query,
    })
      .then((response) => {
        const items = response.data.items;
        if (items) {
          if (type === "get") dispatch(successDataQuery(items));
          if (type === "update") dispatch(updateDataQuery(items));
        } else {
          dispatch(failedDataQuery(items));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(failedDataQuery(errorMsg));
      });
  };
};
