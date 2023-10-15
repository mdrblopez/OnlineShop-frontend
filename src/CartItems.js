import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function CartProducts({
  productTitle,
  productPrice,
  productCover,
  productId,
  itemQuantity,
  userId,
  checkBox,
  _id,
}) {
  const [productQuantity, setProductQuantity] = useState(itemQuantity);
  const [isIncluded, setIsIncluded] = useState(checkBox);
  const { updateCart, setUpdateCart, setAddToCartCheck, addToCartCheck } =
    useContext(UserContext);
  let cartNumber = addToCartCheck + 1;
  // to update
  function quantitySubtract() {
    if (productQuantity > 1) {
      console.log("subtract the product quantity");
      let count = productQuantity;
      count--;
      setProductQuantity(count);
      console.log(productQuantity);
      handleUpdate(count, isIncluded);
    }
  }

  function quantityAdd() {
    console.log("add the product quantity");
    let count = productQuantity;
    count++;
    setProductQuantity(count);
    console.log(productQuantity);
    handleUpdate(count, isIncluded);
  }

  const handleChange = (event) => {
    console.log(isIncluded);
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
      console.log(productId);
      setIsIncluded(true);
    } else {
      console.log("⛔️ Checkbox is NOT checked");
      console.log(productId);
      setIsIncluded(false);
    }
    console.log(isIncluded);
    handleUpdate(productQuantity, event.target.checked);
  };

  // Update function
  async function handleUpdate(count, box) {
    itemQuantity = count;
    console.log(itemQuantity);

    checkBox = box;
    console.log(checkBox);

    const response = await fetch("http://localhost:4000/mycart", {
      method: "PUT",
      body: JSON.stringify({
        userId,
        productId,
        productTitle,
        productPrice,
        productCover,
        itemQuantity,
        checkBox,
        _id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      if (updateCart < 1) {
        setUpdateCart(1);
      }
      if (updateCart > 0) {
        setUpdateCart(0);
      }
    } else {
      alert("Failed to update.");
    }
    setAddToCartCheck(cartNumber++);
  }

  // Remove item in the cart
  async function handleRemove() {
    console.log("remove item");
    const response = await fetch("http://localhost:4000/delete", {
      method: "POST",
      body: JSON.stringify({
        _id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log("Successfully deleted.");

      if (updateCart < 1) {
        setUpdateCart(1);
      }
      if (updateCart > 0) {
        setUpdateCart(0);
      }
    } else {
      alert("Failed to delete.");
    }
    setAddToCartCheck(cartNumber++);
  }

  return (
    <div className="cartPage">
      {/* <p>Total Price: {price}</p> */}
      <div className="cart">
        <div className="cartPicBox">
          <div className="container">
            <div className="checkbox">
              <input
                type="checkbox"
                name="isIncluded"
                defaultChecked={checkBox}
                value={isIncluded}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="product-image">
            <img
              src={"http://localhost:4000/" + productCover}
              alt={productTitle}
            />
          </div>
        </div>

        <div className="cartInfo">
          <h5>{productTitle}</h5>

          <p className="price"> &#8369; {productPrice}</p>
          <div className="quantityDiv">
            <label for="quantityInput"> Quantity: </label>
            <div className="quantity">
              <button onClick={quantitySubtract}>-</button>
              <input
                type="number"
                id="quantityInput"
                min="0"
                placeholder={productQuantity}
                value={productQuantity}
                onChange={(ev) => setProductQuantity(ev.target.value)}
              />
              <button onClick={quantityAdd}>+</button>
            </div>
          </div>

          <button className="remove" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
