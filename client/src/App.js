import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { useEffect, useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Register from "./Pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import ProductDetails from "./Components/ProductDetails";
import Basket from "./Pages/Basket";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";

function App({ stripeAccount }) {
  const [user, setUser] = useState({});
  const stripePubKey =
    "pk_test_51JwoPxKpxt7jxnaYKaDS5lQsYEJRDuOGtjvlHALqPPskyjeWhCLJBmQxnkYWyHVS1dY3u3NXHfFQTth554jcSlAP00FsoVRA4u";
  const stripePromise = useMemo(
    () => loadStripe(stripePubKey, { stripeAccount }),
    [stripeAccount]
  );
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
    return () => unSubscribe;
  }, []);
  return (
    <div>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Basket user={user} />} />
        <Route path="/order" element={<Order user={user} />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
