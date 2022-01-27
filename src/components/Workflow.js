import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSearchData } from "../common/redux/search/searchAction";
import AdvanceSearch from "./AdvanceSearch";
import Navbar from "./Navbar";
import SearchResaults from "./SearchResaults";

const Workflow = ({ fetchSearchData }) => {
  const [loadedElements, setLoadedElements] = useState(0);
  const [previousQuery, setPreviousQuery] = useState();

  const [searchQueryBasic, setSearchQueryBasic] = useState("*");
  const [advanceSearch, setAdvanceSearch] = useState(false);

  // const query = new URLSearchParams(window.location.search);
  // console.log("queryNowe", query.get("q"));

  const createQueryBasic = (event, data) => {
    event.preventDefault();
    const queryFromNav = data;
    if (queryFromNav !== "" && queryFromNav.length >= 3) {
      setSearchQueryBasic(queryFromNav);
      fetchSearchData(queryFromNav);
    }
  };

  let URL = `${searchQueryBasic}&startIndex=${loadedElements}`;
  useEffect(() => {
    if (previousQuery === searchQueryBasic) {
      fetchSearchData(URL, "update");
    } else {
      setPreviousQuery(searchQueryBasic);
      setLoadedElements(0);
      fetchSearchData(URL, "get");
    }
  }, [URL, fetchSearchData, loadedElements]);

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
        searchQueryBasic={searchQueryBasic}
        loadedElements={loadedElements}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
