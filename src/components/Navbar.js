import { BiSearch } from "react-icons/bi";

const Navbar = ({ setAdvanceSearch, createQueryBasic }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <p>List of Books</p>
      </div>
      <div className="navbar__search">
        <form className="navbar__search--base" onSubmit={(e) => createQueryBasic(e, e.target.basicSearch.value)}>
          <input
            type="text"
            name="basicSearch"
            className="navbar__search--input"
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
