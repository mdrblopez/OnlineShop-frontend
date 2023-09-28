import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const { userInfo, setUserInfo, searchInput, searchHandler } =
    useContext(UserContext);

  //userInfo already set in login function..

  console.log(userInfo);

  function logout() {
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
              <Link to="/postproduct">Post</Link>
            </>
          )}
          {username && (
            <>
              <Link to="/cart">Cart</Link>
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
