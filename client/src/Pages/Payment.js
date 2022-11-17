import React, { useEffect, useState } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { cartTotals, emptyCart } from "../ReduxStore/basketSlice";
import { publicRequest } from "../requestMethod";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutProduct from "../Components/CheckoutProduct";
import Currency from "react-currency-formatter";
import CurrencyFormat from "react-currency-format";

import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    "pk_test_51JwoPxKpxt7jxnaYKaDS5lQsYEJRDuOGtjvlHALqPPskyjeWhCLJBmQxnkYWyHVS1dY3u3NXHfFQTth554jcSlAP00FsoVRA4u"
  );

  useEffect(() => {
    dispatch(cartTotals());
  }, [cart, dispatch]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const checkoutSession = await publicRequest.post("/payment/create", {
      items: cart.cartItems,
      email: user.email,
      user_id: user._id,
      amount: cart.cartTotalAmount,
    });
    const result = await stripe
      .redirectToCheckout({
        sessionId: checkoutSession.data.sessionId,
      })
      .then(dispatch(emptyCart()));

    if (result.error) {
      alert("Something Went Wrong");
    }
    // navigate("/order");
  };
  return (
    <div className="bg-white container mx-auto p-10">
      {cart.cartItems.length === 0 ? (
        <h1 className="text-center text-4xl font-bold">
          Go Back To The Homepage and Add Some Items To your Cart
        </h1>
      ) : (
        <>
          <div className="flex p-5 mx-0 my-5 border-b-gray-300 justify-around">
            <div>
              <h3>Delivery Address</h3>
            </div>
            <div style={{ flex: 0.8 }}>
              <p>{user?.username}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>

          <div className="flex p-5 mx-0 my-5 border-b-gray-300 justify-around">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div style={{ flex: 0.8 }}>
              {cart.cartItems.map((item) => (
                <CheckoutProduct item={item} key={item._id} />
              ))}
            </div>
          </div>
          <div className="flex p-5 my-5 border-b-gray-300 justify-around">
            <div className="payment__title">
              <h3 className="pb-5 pr-5">Payment Method</h3>
            </div>
            <div style={{ flex: 0.8 }} className="justify-center items-center">
              <form
                // onSubmit={handleSubmit}
                style={{
                  maxWidth: 400,
                  border: "1px solid lightgray",
                  padding: 20,
                }}
              >
                <CardElement />

                <div className="flex justify-between items-center mt-5">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={cart.cartTotalAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />

                  <button className="button" onClick={handleCheckout}>
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
