import React, { useState } from "react";
import { StarOutline } from "@material-ui/icons";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../ReduxStore/basketSlice";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethod";

const Product = ({ product }) => {
  const { _id, title, price, description, category, image, rating } = product;
  const dispatch = useDispatch();
  const [hasPrime] = useState(Math.random() < 0.5);
  const addItemToBasket = async () => {
    const product = {
      _id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };
    dispatch(addToCart(product));
    if (product.title) {
      alert("Item Added To The Cart");
    }
  };
  return (
    <div
      className="relative flex flex-col m-4 bg-white z-30 p-10"
      style={{ height: 500 }}
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="flex justify-center">
        <img
          loading="lazy"
          src={image}
          alt=""
          className="object-contain w-52 h-52"
        />
      </div>
      <h4 className="my-3">
        <Link to={`/details/${_id}`}>
          <p>{title}</p>
        </Link>
      </h4>
      <div className="flex items-center space-x-1">
        <span>{rating.rate}</span>
        <StarOutline className="text-yellow-500" />

        <span>({rating.count})</span>
      </div>
      <p className="text-xs mt-2 my-2 line-clamp-2">{description}</p>

      <div className="flex justify-between">
        <div className="mb-5">
          <Currency quantity={price} />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img
              loading="lazy"
              src="http://links.papareact.com/fdw"
              alt=""
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <button
        onClick={addItemToBasket}
        className="mt-auto button font-semibold"
      >
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
