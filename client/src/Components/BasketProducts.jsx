import { StarOutline } from "@material-ui/icons";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import primeTag from "../images/Prime-tag-.png";
import {
  addToCart,
  decreaseFromCart,
  removeFromCart,
  emptyCart,
} from "../ReduxStore/basketSlice";
const BasketProducts = ({ item }) => {
  const { _id, title, description, price, categroy, rating, hasPrime, image } =
    item;

  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      _id,
      title,
      description,
      price,
      categroy,
      rating,
      hasPrime,
      image,
    };
    dispatch(addToCart(product));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromCart({ _id }));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(emptyCart());
  };
  return (
    <div className="grid grid-cols-5 my-5">
      <img
        loading="lazy"
        src={image}
        alt=""
        style={{ height: "200px ", width: "200px", objectFit: "contain" }}
      />
      <div className="col-span-3 mx-5 flex flex-col justify-center">
        <p className="font-medium text-xl mb-2">{title}</p>

        <div className="flex items-center space-x-1">
          {<span>{rating.rate}</span>}
          <StarOutline className="text-yellow-500" />
          {<span> ({rating.count})</span>}
        </div>
        <p className="text-sm mt-2 mb-2 line-clamp-3">{description}</p>
        <div className="flex space-x-3">
          <div className="flex itmes-center ">
            <button
              onClick={() => handleDecreaseCart(item)}
              style={{
                width: "30px",
                height: "30px",
                margin: 0,
                border: "1px solid #EFBA35",
              }}
              className="hover:bg-amazon_blue-btn hover:text-white m-0 font-bold text-lg rounded-l-md"
            >
              -
            </button>

            <div
              className="p-0 text-center w-10"
              style={{
                height: "30px",
                border: "1px solid #EFBA35",
                borderWidth: "1px 0",
              }}
            >
              {item.cartQuantity}
            </div>

            <button
              onClick={() => addItemToCart(item)}
              style={{
                width: "30px",
                height: "30px",
                fontSize: "15px",
                border: "1px solid #EFBA35",
              }}
              className="hover:bg-amazon_blue-btn hover:text-white font-bold m-0 text-lg rounded-r-md"
            >
              +
            </button>
          </div>
          <button
            className="border-l-2 px-2"
            style={{ color: "#0066c0" }}
            onClick={removeItemFromBasket}
          >
            Delete
          </button>
        </div>
        {hasPrime && (
          <div className="flex space-x-2 items-center">
            <img loading="lazy" src={primeTag} alt="" className="w-12" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col  justify-self-end ">
        <div className="font-semibold text-xl">
          <Currency quantity={price} style={{ fontWeight: 600 }} />
        </div>
      </div>
    </div>
  );
};

export default BasketProducts;
