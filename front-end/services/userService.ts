import { User } from "@/types";

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const registerUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getAllUsers = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const getUserById = async (userId: number) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const UserService = {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
};

export default UserService;
