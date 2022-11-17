import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
  }
  return stripePromise;
};
export default getStripe;
/*   const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await publicRequest.post("/checkout/create-checkout-session", {
      items: cart,
    });
    if (res.statusCode === 500) return;
    const data = await res.json();
    stripe.redirectToCheckout({ sessionId: data.id });
    console.log(data);
  }; */
