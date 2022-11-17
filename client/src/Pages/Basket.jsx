import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import primeDay from "../images/Prime-day-banner.png";

import Currency from "react-currency-formatter";
import BasketProducts from "../Components/BasketProducts";
import { cartTotals } from "../ReduxStore/basketSlice";

import { Link } from "react-router-dom";

const Basket = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartTotals());
  }, [cart, dispatch]);

  return (
    <div className="bg-gray-100 ">
      <div className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <img
            loading="lazy"
            src={primeDay}
            alt=""
            style={{ width: "1020px", height: "250px", objectFit: "contain" }}
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4 font-semibold">
              {cart.cartItems.length === 0
                ? "Your Cart Is Empty"
                : "Your Shoping Cart"}
            </h1>

            {cart.cartItems.map((item, i) => (
              <BasketProducts key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div
          className={`flex flex-col p-10 ${
            cart.cartItems.length > 0 && "bg-white shadow-md"
          }`}
        >
          {cart.cartItems.length > 0 && (
            <div>
              <h2 className="whitespace-nowrap">
                SubTotal ({cart.cartItems.length}) items:
                <span className="font-bold">
                  {<Currency quantity={cart.cartTotalAmount} />}
                </span>
              </h2>
              <button
                className={`button w-full mt-2 ${
                  !user &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <Link to={user && "/payment"}>
                  {!user ? "Sign To Checkout" : "Proceed To Ceckout"}
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;

/* 
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = useCallback((token) => setStripeToken(token), []); */

/* useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post(`/checkout/payment`, {
          tokenId: stripeToken.id,
          amount: cart.cartTotalAmount,
        });
        console.log(res);
        dispatch(emptyCart());
        navigate(
          {
            query: { paymentData: JSON.stringify(res.data) },
          },
          "/success"
        );
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && cart.cartTotalAmount >= 1 && makeRequest();
  }, [stripeToken, cart.cartTotalAmount, navigate]); */
