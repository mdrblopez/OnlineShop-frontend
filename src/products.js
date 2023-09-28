// import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Products({
  title,
  category,
  price,
  rating,
  count,
  description,
  cover,
  updatedAt,
  _id,
}) {
  const { productDetail } = useContext(UserContext);

  const linkStyle = {
    // margin: "1rem",
    textDecoration: "none",
    color: "blue",
  };

  return (
    <div className="product">
      <img src={"http://localhost:4000/" + cover} alt={title} />

      <div className="description">
        <div className="title">
          <p>
            <h5>{title}</h5>
          </p>
        </div>

        {/* <time>{format(new Date(updatedAt), "MMM d, yyyy HH:mm")}</time> */}
        {/* <time> Posted: {formatISO9075(new Date(updatedAt))}</time> */}
        <div className="price-viewDetails">
          <p className="price"> &#8369; {price}</p>
          {/* <p className="rating">{rating}</p> */}

          {/* <p className="description">{description}</p> */}

          <Link to={`/productdetail/${_id}`} style={linkStyle}>
            <button
              id="viewDetails"
              className="viewDetail"
              onClick={() => productDetail(_id)}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
