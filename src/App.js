import { useEffect, useState } from "react";
import "./App.css";
// import { bookListCreate } from "./common/api/bookApi";
import AdvanceSearch from "./components/AdvanceSearch";
import { fetchSearchData } from "./common/redux/search/searchAction";
import { BiSearch } from "react-icons/bi";
import { connect, useSelector } from "react-redux";

function App({ searchData, fetchSearchData }) {
  // const [book, setBook] = useState(null);
  const [searchQueryBasic, setSearchQueryBasic] = useState("phone");
  const [advanceSearch, setAdvanceSearch] = useState(false);
  //why%20we%20sleep+inauthor:Walker
  const createQueryBasic = (event) => {
    event.preventDefault();
    console.log(event.target.basicSearch.value);
    if (event.target.basicSearch.value !== "") {
      setSearchQueryBasic(event.target.basicSearch.value);
      console.log("basic");
    }
  };

  useEffect(() => {
    fetchSearchData(searchQueryBasic);
  }, [searchQueryBasic]);

  return (
    <div className="App">
      {advanceSearch && <AdvanceSearch setAdvanceSearch={setAdvanceSearch} />}
      {searchData && console.log(searchData)}
      <nav className="navbar">
        <div className="navbar__logo">
          <p>List of Books</p>
        </div>
        <div className="navbar__search">
          <form className="navbar__search--base" onSubmit={createQueryBasic}>
            <input
              type="text"
              name="basicSearch"
              className="navbar__search--input"
              placeholder="Type title of a book..."
            />
            <button type="submit" className="navbar__search--button">
              <BiSearch size={25} />
            </button>
          </form>
          <div className="more" onClick={() => setAdvanceSearch(true)}>
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
        </div>
        <div className="navbar__userprofile">
          <div className="navbar__userprofile--button" />
        </div>
      </nav>
      <div className="main">
        {searchData &&
        searchData.books &&
        searchData.books.data &&
        searchData.books.data.items ? (
          searchData.books.data.items.map((state) => (
            <>
              <div className="container" key={state.id}>
                <div className="container__cover">
                  {state.volumeInfo.imageLinks ? (
                    <img
                      src={state.volumeInfo.imageLinks.thumbnail}
                      alt={`${state.volumeInfo.imageLinks.thumbnail}cover`}
                    />
                  ) : (
                    <img
                      src="https://img.redro.pl/plakaty/nie-symbolem-400-42238205.jpg"
                      alt={`cover`}
                    />
                  )}
                </div>
                <div className="container__details">
                  <div className="container__title">
                    {state.volumeInfo.title}
                  </div>
                  {state.volumeInfo.authors && (
                    <div className="container__author">
                      {state.volumeInfo.authors.map((author, index) => {
                        return state.volumeInfo.authors.length - 1 !== index ? (
                          <span>{author + ","} </span>
                        ) : (
                          <span>{author}</span>
                        );
                      })}
                    </div>
                  )}
                  <div className="container__description">
                    {state.volumeInfo.description}
                  </div>
                </div>
              </div>
              <div className="lineBetween" />
            </>
          ))
        ) : (
          <div className="nothing">
            <p className="nothing__information">Nothing has been found 😢</p>
          </div>
        )}
      </div>
      {/* {console.log(searchQueryBasic)} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searchData: state.searchList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchData: (initial) => dispatch(fetchSearchData(initial)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
