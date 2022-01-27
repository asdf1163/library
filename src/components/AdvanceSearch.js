import "./AdvanceSearch.css";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import languageList from "../common/language.json";

const AdvanceSearch = ({
  setAdvanceSearch,
  createQueryBasic,
  fetchSearchData,
}) => {

  const dataType = [
    {
      inintal: "+",
      type: "intitle:",
    },
    {
      inintal: "+",
      type: "inauthor:",
    },
    {
      inintal: "&",
      type: "langRestrict",
    },
    {
      inintal: "&",
      type: "orderBy",
    },
  ];

  const createQueryAdvanced = (event) => {
    let add = false;

    event.preventDefault();
    let tempQuery = "";
    const title = event.target.title.value.replace(" ", "+");
    const author = event.target.author.value.replace(" ", "+");
    const language = event.target.language.value;
    const orderBy = event.target.orderBy.value;

    if (title !== "") {
      tempQuery += `intitle:${title}`;
      add = true;
    }
    if (author !== "") {
      if (add) tempQuery += `+inauthor:${author}`;
      else {
        tempQuery += `inauthor:${author}`;
        add = true;
      }
    }
    if (language !== "") {
      if (add) tempQuery += `&langRestrict=${language}`;
      else {
        tempQuery += `langRestrict=${language}`;
        add = true;
      }
    }
    if (!add) console.log("Fill missing inputs");
    else {
      tempQuery += `&orderBy=${orderBy}`;

      setAdvanceSearch(false);
      return tempQuery;
    }
  };

  return (
    <div className="advanceSearch">
      <div className="exitSign" onClick={() => setAdvanceSearch(false)}>
        <AiOutlineCloseCircle size={50} />
      </div>
      <form
        className="searchField"
        onSubmit={(e) => createQueryBasic(e, createQueryAdvanced(e))}
      >
        <label className="searchField--label">
          TITLE
          <input
            type="text"
            name="title"
            className="searchField--fill"
            placeholder="Type title of a book..."
          />
        </label>
        <label className="searchField--label">
          AUTHOR
          <input
            type="text"
            name="author"
            className="searchField--fill"
            placeholder="Type authors of a book..."
          />
        </label>
        <label className="searchField--label">
          LANGUAGE
          <select name="language" className="searchField--fill">
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
