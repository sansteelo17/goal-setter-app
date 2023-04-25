const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { generateJWTToken } = require("../lib/generate-jwt-token");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!req.body) {
    res.status(400);
    throw new Error("Please fill in all fields!");
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    res.status(400);
    throw new Error("That user already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  const newUser = User.create({
    name,
    email,
    password: hashedPwd,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateJWTToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not create a new user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(500);
    throw new Error("Could not find that user!");
  }

  const pwdIsCorrect = await bcrypt.compare(password, user.password);

  if (user && pwdIsCorrect) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getMe };
