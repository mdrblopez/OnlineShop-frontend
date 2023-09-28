import { useEffect, useState, useContext } from "react";
import Products from "../products";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const { setShopList, categoryHandler, quantityHandler } =
    useContext(UserContext);

  quantityHandler(1);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setProducts(posts);
      });
    });
  }, []);

  setShopList(products);
  console.log(products);

  let categories = products.map((item) => item.category);
  let uniqueCat = [];
  categories.forEach((item) => {
    if (!uniqueCat.includes(item)) {
      uniqueCat.push(item);
    }
  });
  console.log(uniqueCat);
  const linkStyle = {
    // margin: "1rem",
    textDecoration: "none",
    color: "blue",
  };

  return (
    <div className="homePage">
      <div className="categoryDiv">
        <div className="categoryDescription">
          <h3>Categories</h3>
        </div>
        <div className="itemCategory">
          {uniqueCat.length > 0 &&
            uniqueCat.map((category) => (
              <Link to={`/category/${category}`} style={linkStyle}>
                <button
                  className="category"
                  onClick={() => categoryHandler(category)}
                >
                  {category} |
                </button>
              </Link>
            ))}
        </div>
      </div>
      <div className="products">
        {products.length > 0 &&
          products.map((product) => (
            <Products {...product} key={product._id} />
          ))}
      </div>
    </div>
  );
}
