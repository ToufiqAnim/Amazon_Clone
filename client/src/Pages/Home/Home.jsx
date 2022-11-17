import React from "react";
import Banner from "../../Components/Banner";
import Products from "../../Components/Products";

// import Product from "../Product/Product";
// import beautySection from "../../images/beautiSection.jpg";
import "./Home.css";
const Home = () => {
  return (
    <div className="h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <Products />
      </div>
    </div>
  );
};

export default Home;
