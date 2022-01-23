import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductsList from "./components/products-list.component";

class App extends Component {
  render() {
    return ( 
      <ProductsList />
      // <BrowserRouter>
      //   <Routes>
      //     <Route path={["/", "/products"]} element={<ProductsList />} />
      //     <Route path="/add" element={<AddProduct />} />
      //     <Route path="/products/:id" element={<Product />} />
      //   </Routes>
      // </BrowserRouter>
    );
  }
}

export default App;