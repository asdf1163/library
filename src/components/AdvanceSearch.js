import "./AdvanceSearch.css";
import { useState } from "react";
import { connect } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fetchSearchData } from "../common/redux/search/searchAction";
import languageList from "../common/language.json";

const AdvanceSearch = ({ setAdvanceSearch, fetchSearchData }) => {
  // const [searchQueryAdvanced, setSearchQueryAdvanced] = useState({
  //   title: "",
  //   author: "",
  //   language: "",
  //   publishedDate: "",
  // });

  // const createQueryBasic = (event) => {
  //   console.log(event.target.basicSearch.value);
  //   if (event.target.basicSearch.value !== "") {
  //     setSearchQueryBasic(event.target.basicSearch.value);
  //     console.log("basic");
  //   }
  // };

  // const handleOnChange = (event, varible) => {
  //   let tempArray = searchQueryAdvanced;
  //   tempArray[varible] = event.target.value;
  //   console.log(tempArray);
  //   setSearchQueryAdvanced(tempArray);
  // };

  // {
  //   /* authors, language, publishedDate */
  //   //intitle:sleep+inauthor:Walker+
  // q=flowers&orderBy=newest&langRestrict=pl
  // }
  // const [listedItems, setListedItems] = useState(0);

  const createQueryAdvanced = (event) => {
    let add = false;

    event.preventDefault();
    let tempQuery = "";

    if (event.target.title.value !== "") {
      tempQuery += `intitle:${event.target.title.value}`;
      add = true;
    }
    if (event.target.author.value !== "") {
      if (add) tempQuery += `+inauthor:${event.target.author.value}`;
      else {
        tempQuery += `inauthor:${event.target.author.value}`;
        add = true;
      }
    }
    if (event.target.language.value !== "") {
      if (add) tempQuery += `&langRestrict=${event.target.language.value}`;
      else {
        tempQuery += `langRestrict=${event.target.language.value}`;
        add = true;
      }
    }
    if (add) tempQuery += `&orderBy=${event.target.orderBy.value}`;
    else tempQuery += `orderBy=${event.target.orderBy.value}`;

    console.log(tempQuery);

    setAdvanceSearch(false);
    return fetchSearchData(tempQuery);
  };

  return (
    <div className="advanceSearch">
      <div className="exitSign" onClick={() => setAdvanceSearch(false)}>
        <AiOutlineCloseCircle size={50} />
      </div>
      <form className="searchField" onSubmit={createQueryAdvanced}>
        <label className="searchField--label">
          TITLE
          <input
            type="text"
            name="title"
            className="searchField--fill"
            placeholder="Type title of a book..."
            // onChange={(e) => handleOnChange(e, "title")}
          />
        </label>
        <label className="searchField--label">
          AUTHOR
          <input
            type="text"
            name="author"
            className="searchField--fill"
            // className="search__input--base"
            placeholder="Type authors of a book..."
            // onChange={(e) => handleOnChange(e, "author")}
          />
        </label>
        <label className="searchField--label">
          LANGUAGE
          <select
            name="language"
            className="searchField--fill"
            // type="text"
            // placeholder="Type language of a book..."
            // className="search__input--base"
            // onChange={(e) => handleOnChange(e, "language")}
          >
            {languageList.map((state) => (
              <option value={state.countryCode}>{state.countryName}</option>
            ))}
          </select>
        </label>
        <label className="searchField--label">
          ORDER BY
          <select name="orderBy" className="searchField--fill">
            <option defaultValue="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </label>

        <button type="submit" className="searchField--submit">
          <BiSearch size={40} />
        </button>
      </form>
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch);
