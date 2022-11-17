// const express = require("express");
const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51JwoPxKpxt7jxnaYmopfJHkr1LVAFZSFmDU1X1ojUYEwkOTDZlUOtixQS7xIwaqBSnYTflApKskjx26wzK3bho6W00ZVPAOm9N"
);
// const websiteURL = process.env.REACT_APP_FRONTEND_URL;
router.post("/create", async (req, res) => {
  const { items, email, user_id } = req.body;
  const transformedItems = items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
        metadata: {
          productid: item.id,
        },
      },
    },
  }));
  console.log(req.body);
  if (!items || !email) {
    return res
      .status(400)
      .json({ error: "Missing required session parameters!" });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: transformedItems,
      client_reference_id: user_id,
      customer_email: email,
      success_url: "localhost:3000/payment/success",
      cancel_url: "localhost:3000/payment/canceled",
      shipping_address_collection: { allowed_countries: ["GB", "US"] },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    res.status(400).json({
      error: "An Error occured!  Unable to create session.",
    });
  }
});
module.exports = router;

/*   stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  ); */
/*  const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_option: [{ shipping_rate: "shr_1M3NuVKpxt7jxnaYKZG6nyX0" }],
      line_items: req.body.map((item) => {
        const img = item.image[0];

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [img],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/canceled`,
    };
    const session = await stripe.checkout.session.create(params); */
