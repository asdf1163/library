import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Navbar = ({
  setAdvanceSearch,
  createQueryBasic
}) => {

  const [searchCorrect, setSearchCorrect] = useState(true);

  const checkValidation = (e) => {
    e.preventDefault()
    const navbarParam = e.target.basicSearch.value;
    if (navbarParam.length >= 3) {
      setSearchCorrect(true);
      createQueryBasic(e, navbarParam);
    } else {
      setSearchCorrect(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <p>List of Books</p>
      </div>
      <div className="navbar__search">
        <form className="navbar__search--base" onSubmit={checkValidation}>
          {!searchCorrect && (
            <span className="navbar__search--information">
              Min. 3 characters
            </span>
          )}
          <input
            type="text"
            name="basicSearch"
            className="navbar__search--input placeholder--default"
            placeholder="Type title of a book..."
          />
          <button type="submit" className="navbar__search--button">
            <BiSearch key="keyLoopBasic" size={25} />
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
  );
};

export default Navbar;
