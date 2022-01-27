import { useNavigate } from "react-router-dom";

const Main = ({ searchQueryBasic, setSearchQueryBasic }) => {
  let navigate = useNavigate();
  const createQueryBasic = (event) => {
    event.preventDefault();
    if (event.target.searchbar.value !== "") {
      setSearchQueryBasic(event.target.searchbar.value);
    }
  };
  return (
    <div>
      Type the title of a book: (min. 3 characters)
      <form onSubmit={(e) => createQueryBasic(e)}>
        <input name="searchbar" className="" />
      </form>
      {searchQueryBasic.length >= 3 && navigate(`/${searchQueryBasic}`)}
    </div>
  );
};

export default Main;
