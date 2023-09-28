import { useContext } from "react";
import { UserContext } from "../UserContext";
import Products from "../products";

export default function CategoryPage() {
  const { shopList, category } = useContext(UserContext);
  let categoryItems = shopList.filter((item) => item.category === category);
  console.log(categoryItems);

  return (
    <div className="categoryPage">
      <div className="category">Category: {category}</div>
      <div className="products">
        {categoryItems.length > 0 &&
          categoryItems.map((product) => (
            <Products {...product} key={product.productId} />
          ))}
      </div>
    </div>
  );
}
