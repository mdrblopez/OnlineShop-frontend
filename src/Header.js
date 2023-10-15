import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const [cartList, setCartList] = useState([]);
  let userCartItems = [];
  const {
    userInfo,
    setUserInfo,
    searchInput,
    searchHandler,
    addToCartCheck,
    setAddToCartCheck,
  } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/mycart").then((response) => {
      response.json().then((list) => {
        setCartList(list);
      });
    });
  }, [addToCartCheck]);

  //filter the user cart items
  if (userInfo) {
    userCartItems = cartList.filter((list) => list.userId === userInfo.id);
    console.log(userCartItems);
    setAddToCartCheck(1);
  }

  //userInfo already set in login function..
  function logout() {
    userCartItems = [];
    setAddToCartCheck(0);
    // to invalidate the cookie
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  const membertype = userInfo?.membertype;

  const linkStyle = {
    textDecoration: "none",
    color: "blue",
  };

  return (
    <header>
      <div className="left-side">
        <Link to="/" className="logo">
          Spendee
        </Link>
      </div>

      <div className="center">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search Product"
            name="search"
            onChange={(ev) => searchHandler(ev.target.value)}
            value={searchInput}
          />

          <Link to={`/search/${searchInput}`} style={linkStyle}>
            <button type="submit" className="searchButton">
              <FaSearch id="search-icon" />
            </button>
          </Link>
        </div>
      </div>
      <div className="right-side">
        <nav>
          {membertype === "merchant" && username && (
            <>
              <Link to="/postproduct">
                Post
                <sup></sup>
              </Link>
            </>
          )}
          {username && (
            <>
              <Link to="/cart">
                Cart
                <sup> {userCartItems.length}</sup>
              </Link>

              <Link to="/">
                <button id="logout" className="logout" onClick={logout}>
                  Logout
                </button>
              </Link>
            </>
          )}

          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
