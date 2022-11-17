import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../ReduxStore/basketSlice";

const CheckoutProduct = ({ item }) => {
  const { _id, image, title, price, cartQuantity } = item;

  const total = price * cartQuantity;
  const dispatch = useDispatch();

  const removeFromTheCart = () => {
    dispatch(removeFromCart({ _id }));
  };

  return (
    <div className="flex my-5">
      <img
        src={image}
        alt=""
        style={{ objectFit: "contain", width: 180, height: 180 }}
      />
      <div className="pl-5">
        <p className="text-lg font-bold">{title}</p>
        <p>
          <small>$</small>
          <strong>
            {price} x {cartQuantity} = {total}
          </strong>
        </p>
        <button onClick={removeFromTheCart} className="mt-2 button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
