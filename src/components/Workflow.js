import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchSearchData,
  updateQueryParams,
} from "../common/redux/search/searchAction";
import AdvanceSearch from "./AdvanceSearch";
import Navbar from "./Navbar";
import SearchResaults from "./SearchResaults";

const Workflow = ({ searchData, fetchSearchData, updateQueryParams }) => {
  const [loadedElements, setLoadedElements] = useState(0);
  const [searchQueryBasic, setSearchQueryBasic] = useState("*");
  const [advanceSearch, setAdvanceSearch] = useState(false);

  useEffect(() => {
    updateQueryParams({ q: searchQueryBasic, startIndex: loadedElements });
    fetchSearchData("update");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedElements]);

  const createQueryBasic = (event, data) => {
    event.preventDefault();
    setSearchQueryBasic(data);
    updateQueryParams({ q: data, startIndex: 0 });
    fetchSearchData("get");
    setLoadedElements(10);
  };

  advanceSearch
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");

  return (
    <>
      {advanceSearch && (
        <AdvanceSearch
          setAdvanceSearch={setAdvanceSearch}
          createQueryBasic={createQueryBasic}
        />
      )}
      <Navbar
        setAdvanceSearch={setAdvanceSearch}
        createQueryBasic={createQueryBasic}
      />
      <SearchResaults
        searchData={searchData}
        setLoadedElements={setLoadedElements}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    searchData: state.searchList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchData: (url, type) => dispatch(fetchSearchData(url, type)),
    updateQueryParams: (params) => dispatch(updateQueryParams(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
