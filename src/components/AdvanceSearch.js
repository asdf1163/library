import "./AdvanceSearch.css";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import languageList from "../common/language.json";

const AdvanceSearch = ({ setAdvanceSearch, createQueryBasic }) => {
  const [correctnessTitle, setCorrectnessTitle] = useState(false);
  const [correctnessAuthor, setCorrectnessAuthor] = useState(false);

  const createQueryAdvanced = (event) => {
    let add = false;

    event.preventDefault();
    const dataConstruct = [
      {
        inital: "&",
        type: "intitle:",
        data: event.target.title.value.replace(" ", "+"),
      },
      {
        inital: "&",
        type: "inauthor:",
        data: event.target.author.value.replace(" ", "+"),
      },
      {
        inital: "&",
        type: "langRestrict=",
        data: event.target.language.value,
      },
      {
        inital: "&",
        type: "orderBy=",
        data: event.target.orderBy.value,
      },
    ];

    const title = event.target.title.value;
    const author = event.target.author.value;

    let tempQuery = "";
    dataConstruct.map(
      (state) =>
        state.data &&
        (add
          ? (tempQuery += state.inital + state.type + state.data)
          : ((tempQuery += state.type + state.data), (add = true)))
    );

    if (title.length >= 3 || author.length >= 3) {
      setAdvanceSearch(false);
      return createQueryBasic(event, tempQuery);
    } else {
      if (title !== "" && title.length <= 3) {
        setCorrectnessTitle(true);
      }
      if (author !== "" && author.length <= 3) {
        setCorrectnessAuthor(true);
      }
    }
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
          />
          {correctnessTitle && (
            <span className="searchField--information">Min. 3 characters</span>
          )}
        </label>
        <label className="searchField--label">
          AUTHOR
          <input
            type="text"
            name="author"
            className="searchField--fill"
            placeholder="Type authors of a book..."
          />
          {correctnessAuthor && (
            <span className="searchField--information">Min. 3 characters</span>
          )}
        </label>
        <label className="searchField--label">
          LANGUAGE
          <select
            defaultValue="en"
            name="language"
            className="searchField--fill"
          >
            {languageList.map((state) => (
              <option key={state.countryCode} value={state.countryCode}>
                {state.countryName}
              </option>
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
          <BiSearch key="keyLoopAdvanced" size={40} />
        </button>
      </form>
    </div>
  );
};

export default AdvanceSearch;
