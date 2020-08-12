const express = require("express");
const user = require("../models/usersmodel");
const { compareHash } = require("../utils/hash");
const { sign } = require("../utils/jwtService");

const usersRouter = express.Router();

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const result = await user.findOne({ where: { email: email } });
  const admin = result.get();
  console.log(admin);
  if (admin) {
    const isValidPassword = compareHash(password, admin.password);
    if (isValidPassword) {
      const token = sign({
        sub: "admin",
        email
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({
        message: "Valid Admin!"
      });
    } else {
      res.status(401).send("Invalid User");
    }
  } else {
    res.status(401).send("Invalid User");
  }
});

const getAllFriends = async () => {
  const result = await user.findAll();
  // TODO: Find a better way to get plain json
  return JSON.parse(JSON.stringify(result));
};

module.exports = {
  usersRouter,
  getAllFriends
};
