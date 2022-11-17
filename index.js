const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/Products");
const userRoute = require("./routes/user");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");
const cartRouter = require("./routes/cart");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connection is Successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/cart", cartRouter);
app.use("/corders", orderRouter);
app.use("/payment", stripeRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server Is Running!!");
});
