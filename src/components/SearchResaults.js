import MoreData from "./MoreData";

const SearchResaults = ({ searchData, setLoadedElements }) => {

  const data = "Lorem ipsum asdf asdfklj cos bla"
  const truncateWords = (data) => {
      const dataSplit = data.split(" ")
      const sliceTable = dataSplit.slice(0,40)
      let connectWord = '';
      sliceTable.map( state => connectWord =  `${connectWord} ${state}`)
      if (sliceTable.length >= 20)
      connectWord += '...'
      return connectWord
  }
  
  return (
    <div className="main">
      {searchData.books ?(
        <>
          {searchData.books.map((book) => (
            <div className="container" key={`${book.id + book.etag}container`}>
              <div className="book">
                <div className="book__cover">
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
                <div className="book__details">
                  <div className="book__title">{book.volumeInfo.title}</div>
                  <div className="book__subtitle">
                    {book.volumeInfo.subtitle}
                  </div>
                  {book.volumeInfo.authors && (
                    <div className="book__author">
                      {book.volumeInfo.authors.map((author, index) => {
                        return book.volumeInfo.authors.length - 1 !== index ? (
                          <span key={author + index}>{author + ","} </span>
                        ) : (
                          <span key={author + index}>{author}</span>
                        );
                      })}
                    </div>
                  )}
                  <div className="book__description">
                    {book.volumeInfo.description &&  truncateWords(book.volumeInfo.description)}
                  </div>
                </div>
              </div>
              <div className="lineBetween" />
            </div>
          ))}

          <MoreData setLoadedElements={setLoadedElements} />
        </>
      ) : (
        <div className="nothing">
          <p className="nothing__information">Nothing has been found 😢</p>
        </div>
      )}
    </div>
  );
};

export default SearchResaults;
