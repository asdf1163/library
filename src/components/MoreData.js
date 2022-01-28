import { useEffect } from "react";

const MoreData = ({ setLoadedElements }) => {
  const loadMoreBooks = () => {
    return setLoadedElements((state) => state + 10);
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span name="moreData" />;
};
export default MoreData;
