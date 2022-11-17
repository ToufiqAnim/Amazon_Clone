import { StarOutline, StarSharp } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { productData } from "../productData";
import { addToCart } from "../ReduxStore/basketSlice";
import { publicRequest } from "../requestMethod";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);

        setProductDetail(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  /*     useEffect(() => {
    fetch(`http://localhost:5000/products/find/${id}`)
      .then((res) => res.json())
      .then((data) => setProductDetail(data));
  }, [id]); */

  const addItemToCart = () => {
    dispatch(addToCart(productDetail));

    alert("Item Added To The Cart");
  };
  return (
    <div className="bg-white h-auto">
      <div className="lg:flex max-w-screen-2xl mx-auto  py-16 px-5 ">
        <div className="mr-5">
          <img
            loading="lazy"
            src={productDetail.image}
            alt=""
            style={{
              height: "300px ",
              width: "300px",
              objectFit: "contain",
              marginBottom: 20,
            }}
          />
        </div>
        <div className=" lg:my-auto ">
          <p className="font-medium text-3xl mb-2 ">{productDetail.title}</p>
          <div className="flex items-center space-x-1">
            <span>{productDetail?.rating?.rate}</span>
            <StarOutline className="text-yellow-500" />

            <span>({productDetail?.rating?.count})</span>
          </div>
          <p className="text-sm my-3 w-2/3">{productDetail.description}</p>
          <div className="font-bold text-md">${productDetail.price}</div>
          <div className="flex my-4 space-x-3 items-center ">
            <button className="button px-24 rounded" onClick={addItemToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <hr className=" mb-4" />
        <p className="font-semibold text-2xl mb-4" style={{ color: "#cc6600" }}>
          Featured Products
        </p>
        <div className="  grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 space-x-4">
          {productData.slice(0, 6).map((product) => (
            <div key={product.id}>
              <img
                src={product.image}
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <div className=" text-start px-4 mb-4">
                <p>{product.title}</p>
                <div className="flex items-center space-x-2 my-2 font-medium">
                  <span> {product.rating.rate}</span>{" "}
                  <StarSharp style={{ color: "#e68320" }} />
                  <span>({product.rating.count})</span>
                </div>
                <div className="font-bold">
                  <Currency quantity={product.price} currency="USD" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProductDetails;
