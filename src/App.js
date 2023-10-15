// to run client: npm start
// to run Api: nodemon index.js

import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";

import CartItemPage from "./pages/CartItemPage";
import { UserContextProvider } from "./UserContext";
import PostPage from "./pages/PostPage";
import ProductDetailPage from "./pages/ProductDetail";
import NotFoundPage from "./pages/PageNotFound";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path={"/search/:id"} element={<SearchPage />} />
          <Route path={"/cart"} element={<CartItemPage />} />
          <Route path={"/postproduct"} element={<PostPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/productdetail/:id"} element={<ProductDetailPage />} />
          <Route path={"/category/:id"} element={<CategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
