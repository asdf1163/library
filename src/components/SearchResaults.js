// import { useEffect } from "react";
// import { fetchSearchData } from "../common/redux/search/searchAction";
import { connect } from "react-redux";
import MoreData from "./MoreData";

const SearchResaults = ({ searchData, loadedElements, setLoadedElements }) => {
  return (
    <div className="main">
      {searchData.books && searchData.books ? (
        <>
          {searchData.books.map((book) => (
            <div className="book" key={`${book.id + book.etag}container`}>
              <div className="container">
                <div className="container__cover">
                  {book.volumeInfo.imageLinks ? (
                    <img
                      key={book.volumeInfo.id + "image"}
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={`${book.volumeInfo.imageLinks.thumbnail}cover`}
                    />
                  ) : (
                    <img
                      key={book.volumeInfo.id + "image"}
                      src="https://img.redro.pl/plakaty/nie-symbolem-400-42238205.jpg"
                      alt={`cover`}
                    />
                  )}
                </div>
                <div className="container__details">
                  <div className="container__title">
                    {book.volumeInfo.title}
                  </div>
                  {book.volumeInfo.authors && (
                    <div className="container__author">
                      {book.volumeInfo.authors.map((author, index) => {
                        return book.volumeInfo.authors.length - 1 !== index ? (
                          <span key={author + index}>{author + ","} </span>
                        ) : (
                          <span key={author + index}>{author}</span>
                        );
                      })}
                    </div>
                  )}
                  <div className="container__description">
                    {book.volumeInfo.description}
                  </div>
                </div>
              </div>
              <div className="lineBetween" />
            </div>
          ))}
          <MoreData
            loadedElements={loadedElements}
            setLoadedElements={setLoadedElements}
          />
        </>
      ) : (
        <div className="nothing">
          <p className="nothing__information">Nothing has been found 😢</p>
          {/* <MoreData
            loadedElements={loadedElements}
            setLoadedElements={setLoadedElements}
          /> */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchData: state.searchList,
  };
};

export default connect(mapStateToProps)(SearchResaults);
