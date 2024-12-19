import { Task } from "@/types";

const getAllTasks = async (token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTaskById = async (taskId: number, token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createTask = async (taskData: any, token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
};

const getTasksByUserId = async (userId: number, token: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const assignTaskToUser = async (
  taskId: number,
  userId: number,
  token: string
) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/assign`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    }
  );
};

const updateTaskStatus = async (
  taskId: number,
  status: string,
  token: string
) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
};

const deleteTask = async (taskId: number, token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const TaskService = {
  getAllTasks,
  getTaskById,
  createTask,
  getTasksByUserId,
  assignTaskToUser,
  updateTaskStatus,
  deleteTask,
};

export default TaskService;
