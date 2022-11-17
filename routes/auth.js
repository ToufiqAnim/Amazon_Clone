const router = require("express").Router();

const CryptoJS = require("crypto-js");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json("Wrong Username");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    let OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    /*     OriginalPassword !== req.body.password &&
      res.status(401).json("Worng Password"); */
    if (OriginalPassword !== req.body.password) {
      res.status(401).json("Wrong credentials!");
      return;
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
