import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Products from "../products";
import { Navigate } from "react-router-dom";

export default function SearchPage() {
  const { shopList, searchInput, searchHandler } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  console.log(searchInput);
  console.log(shopList);
  let textSearch = searchInput.toLowerCase();
  console.log(textSearch);

  let searchResults = [];

  shopList.forEach((element) => {
    let titleText = element.title.toLowerCase();
    let categoryText = element.category.toLowerCase();
    console.log(titleText);
    if (titleText.includes(textSearch) || categoryText.includes(textSearch)) {
      searchResults.push(element);
    }
  });
  console.log(searchResults);

  function homepage() {
    searchHandler("");
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="searchPage">
      <div className="result-homepageBtn">
        <div className="searchText-text">
          Search Result for: <b>{searchInput}</b>
        </div>
        <button onClick={homepage}>Back to Homepage</button>
      </div>

      <div className="searchText-display">
        {searchResults.length > 0 &&
          searchResults.map((product) => (
            <Products {...product} key={product._id} />
          ))}
        {searchResults < 1 && (
          <div className="noResult">
            <h3>We looked and looked..</h3>
            <h4>But we could not find any matches for "{searchInput}"</h4>
            <p>
              Double check your search for any typos or spelling errors - or try
              a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
