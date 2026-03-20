import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Mainlayout/Layout";
import HomePage from "./Pages/HomePage";
import CategoriesPage from "./Pages/CategoriesPage";
import ProductPage from "./Pages/ProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}