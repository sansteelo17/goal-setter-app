const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");

const getAllGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user

  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findGoal = await Goal.findById(id);

  if (!findGoal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user

  if (findGoal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  await Goal.findByIdAndRemove(id);

  res.status(200).json({ id });
});

module.exports = {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
