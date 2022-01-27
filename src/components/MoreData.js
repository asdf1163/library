import { useEffect } from "react";

const MoreData = ({ loadedElements, setLoadedElements }) => {
  const loadMoreBooks = () => {
    if (loadedElements <= 100) {
      return setLoadedElements((state) => state + 10);
    }
    return console.log("wiecej");
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      loadMoreBooks();
    }
  };

  useEffect(() => {
    loadMoreBooks();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return <span name="moreData" />;
};
export default MoreData;
