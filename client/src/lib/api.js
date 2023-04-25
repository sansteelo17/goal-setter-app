import axios from "axios";

const USER_URL = "/api/users/";
const GOAL_URL = "/api/goals/";

export const registerUser = async (userData) => {
  const response = await axios.post(USER_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(USER_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const createNewGoal = async (goalText, token) => {
  const response = await axios.post(GOAL_URL, goalText, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllGoals = async (token) => {
  const response = await axios.get(GOAL_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteGoal = async (goalId, token) => {
  const response = await axios.delete(GOAL_URL + goalId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
