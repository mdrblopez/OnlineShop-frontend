import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [shopList, setShopList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemDetail, setItemDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [updateCart, setUpdateCart] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [addToCartCheck, setAddToCartCheck] = useState(0);
  const [updatePostPage, setUpdatePostPage] = useState(0);

  const productDetail = (itemId) => {
    console.log(itemId);
    setItemDetail(shopList.find((item) => item._id === itemId));
  };
  console.log(itemDetail);
  const categoryHandler = (category) => {
    console.log(category);
    setCategory(category);
  };
  console.log(category);

  const quantityHandler = (itemQuantity) => {
    setQuantity(itemQuantity);
  };
  const searchHandler = (search) => {
    console.log(search);
    setSearchInput(search);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        shopList,
        setShopList,
        productDetail,
        categoryHandler,
        itemDetail,
        quantity,
        setQuantity,
        cartItems,
        setCartItems,
        category,
        quantityHandler,
        updateCart,
        setUpdateCart,
        searchInput,
        setSearchInput,
        searchHandler,
        totalCartItems,
        setTotalCartItems,
        addToCartCheck,
        setAddToCartCheck,
        updatePostPage,
        setUpdatePostPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
