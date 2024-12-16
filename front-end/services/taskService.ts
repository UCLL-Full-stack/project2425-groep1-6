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

const TaskService = {
  getAllTasks,
  getTaskById,
};

export default TaskService;
