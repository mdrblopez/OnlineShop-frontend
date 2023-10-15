import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function UserProduct({ title, _id }) {
  const { setUpdatePostPage } = useContext(UserContext);
  let updatechange = 1;
  // Remove product
  async function handleRemove() {
    console.log(_id);
    const response = await fetch("http://localhost:4000/productdelete", {
      method: "POST",
      body: JSON.stringify({
        _id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Successfully removing the product!");
      setUpdatePostPage(updatechange++);
    } else {
      alert("Failed to delete.");
    }
  }

  return (
    <div className="userProduct">
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="removeProduct">
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}
