import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import UserProduct from "../UserProductPage";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [products, setProducts] = useState([]);
  const { userInfo, updatePostPage } = useContext(UserContext);
  const shopId = userInfo.id;

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setProducts(posts);
      });
    });
  }, [updatePostPage]);
  console.log(products);
  //filter the user products
  let userProductItems = products.filter((item) => item.shop === userInfo.id);
  console.log(userProductItems);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("category", category);
    data.set("price", price);
    data.set("rating", rating);
    data.set("count", count);
    data.set("description", description);
    data.set("shop", shopId);
    data.set("file", files[0]);
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    alert("Successfully posting the product!");
    return <Navigate to={"/"} />;
  }
  if (!userInfo.id) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="postPage">
      <form onSubmit={createNewPost} className="posting">
        <h2>Post: Product Details</h2>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="category"
          placeholder="Category"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        />
        <input
          type="price"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <input
          type="rating"
          placeholder="Rating"
          value={rating}
          onChange={(ev) => setRating(ev.target.value)}
        />
        <input
          type="count"
          placeholder="Count"
          value={count}
          onChange={(ev) => setCount(ev.target.value)}
        />
        <input
          type="file"
          // value={files}
          onChange={(ev) => setFiles(ev.target.files)}
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <button style={{ marginTop: "5px" }}>Post Product</button>
      </form>
      <div className="postPageProductList">
        <h2>Your Product List</h2>

        <div className="productName">
          <h4>Product Name</h4>
        </div>

        <div className="postProuctList">
          {userProductItems.length > 0 &&
            userProductItems.map((product) => (
              <UserProduct {...product} key={product._id} />
            ))}
          {userProductItems.length == 0 && (
            <p> **** No available product ****</p>
          )}
        </div>
      </div>
    </div>
  );
}
