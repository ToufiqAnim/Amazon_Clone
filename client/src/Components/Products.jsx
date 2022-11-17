import axios from "axios";
import React, { useState, useEffect } from "react";

import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {}
    };
    fetchedProducts();
  }, []);
  /* 
  useEffect(() => {
    const fetchedProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(json);
    };
    fetchedProducts();
  }, []);
 */

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto">
      {products.slice(0, 4).map((product) => (
        <Product key={product._id} product={product} />
      ))}
      <img
        loading="lazy"
        className="md:col-span-full m-4"
        src="http://links.papareact.com/dyz"
        alt=""
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
