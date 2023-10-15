import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import CartProducts from "../CartItems";
import { Navigate } from "react-router-dom";

export default function CartItemPage() {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [totalQuantity, setTotalQuantity] = useState("0");
  const { userInfo, updateCart, setTotalCartItems } = useContext(UserContext);
  const user_id = userInfo.id;

  console.log(user_id);

  useEffect(() => {
    fetch("http://localhost:4000/mycart").then((response) => {
      response.json().then((list) => {
        setCartList(list);
      });
    });
    console.log(updateCart);
  }, [updateCart]);

  //filter the user cart items
  let userCartItems = cartList.filter((list) => list.userId === user_id);
  console.log(userCartItems);
  setTotalCartItems(userCartItems.length);

  useEffect(() => {
    let price = 0;
    let quantity = 0;
    userCartItems.forEach((item) => {
      if (item.checkBox) {
        price += item.itemQuantity * item.productPrice;
        quantity += Number(item.itemQuantity);
      }
    });
    console.log(price);
    let priceFix = price.toFixed(2);
    setTotalPrice(priceFix);
    setTotalQuantity(quantity);
  }, [userCartItems]);

  if (!userInfo.id) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="cartPage-main">
      <div className="price-checkout">
        <h3 className="cartPage-price">
          Total Price: <span>&#8369; {totalPrice} </span>
        </h3>
        <button>Check Out ({totalQuantity})</button>
      </div>

      <div className="cartPage">
        {userCartItems.length > 0 &&
          userCartItems.map((product) => (
            <CartProducts {...product} key={product.productId} />
          ))}
      </div>
    </div>
  );
}
