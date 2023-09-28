import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function ProductDetailPage() {
  const [loginPage, setLoginPage] = useState(false);
  const [cartList, setCartList] = useState([]);
  const { userInfo, itemDetail, quantity, quantityHandler, searchHandler } =
    useContext(UserContext);
  const userId = userInfo.id;
  const productId = itemDetail._id;
  const productTitle = itemDetail.title;
  const productPrice = itemDetail.price;
  const productCover = itemDetail.cover;

  let itemQuantity = quantity;
  let checkBox = true;
  searchHandler("");

  useEffect(() => {
    fetch("http://localhost:4000/mycart").then((response) => {
      response.json().then((list) => {
        setCartList(list);
      });
    });
  }, []);
  console.log(itemDetail._id);
  //To filter if the product exist in the cart
  const itemExist = cartList.find((list) => list.productId === itemDetail._id);
  console.log(itemExist);

  async function addToCart() {
    console.log(cartList);
    if (!itemExist) {
      const response = await fetch("http://localhost:4000/mycart", {
        method: "POST",
        body: JSON.stringify({
          userId,
          productId,
          productTitle,
          productPrice,
          productCover,
          itemQuantity,
          checkBox,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Successfully added in your cart.");
      } else {
        alert("Failed to add in the cart.");
      }
    } else {
      console.log("The item already exist in the your cart.");
      alert("The item already EXIST in the your cart.");
    }
  }

  function quantitySubtract() {
    if (quantity > 1) {
      let count = quantity;
      console.log(count--);
      quantityHandler(count);
      console.log({ quantity });
    }
  }
  function quantityAdd() {
    let count = quantity;
    // console.log(count);
    console.log(count++);
    quantityHandler(count);
    console.log({ quantity });
  }
  if (!productId) {
    return <Navigate to={"/"} />;
  }

  function redirect() {
    setLoginPage(true);
  }
  if (loginPage) {
    return <Navigate to={"/"} />;
  }
  const linkStyle = {
    textDecoration: "none",
    color: "blue",
  };
  return (
    <div className="itemDetail">
      <li className="detail">
        <div className="imageDiv">
          <img
            src={"http://localhost:4000/" + itemDetail.cover}
            alt={itemDetail.title}
          />
        </div>
        <div className="detailDescription">
          <ul className="itemDescription">
            <li className="selectedTitle">{itemDetail.title}</li>
            <li>
              <span>&#8369; </span> {itemDetail.price}
            </li>
            <li>
              Rating: {itemDetail.rating}({itemDetail.count})
            </li>
            <h4>Description:</h4>
            <li>{itemDetail.description}</li>
          </ul>
          <br />
          <div className="quantityDiv">
            <label for="quantityInput"> Quantity: </label>
            <div className="quantity">
              <button onClick={quantitySubtract}>-</button>

              <input
                type="number"
                id="quantityInput"
                min="0"
                placeholder="1"
                value={quantity}
                onChange={(ev) => quantityHandler(ev.target.value)}
              />
              <button onClick={quantityAdd}>+</button>
            </div>
          </div>
          <div className="AddAndBuyBtn">
            {userId && <button onClick={addToCart}>Add to Cart</button>}
            {!userId && (
              <Link to="/login" style={linkStyle}>
                <button onClick={redirect}>Add to Cart</button>
              </Link>
            )}
            <button>Buy Now</button>
          </div>
        </div>
      </li>
    </div>
  );
}
