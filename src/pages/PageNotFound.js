import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function NotFoundPage() {
  const [redirect, setRedirect] = useState(false);

  function notFound() {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="pageNotFound">
      <p>Page Not Found. Would you like to go to the home page?</p>
      <button onClick={notFound}>Yes</button>
    </div>
  );
}
