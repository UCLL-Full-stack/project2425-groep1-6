import React, { useEffect, useState } from "react";
import TaskService from "../../services/taskService";
import { Task } from "../../types";
import UserService from "@/services/userService";
import { jwtDecode } from "jwt-decode";

const TasksOverviewTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = sessionStorage.getItem("loggedInUserToken");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken: any = jwtDecode(token);
        setRole(decodedToken.role);

        const response = await TaskService.getAllTasks(token);
        if (!response.ok) {
          throw new Error(`Could not fetch tasks. Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAssign = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem("loggedInUserToken");
      if (!token) {
        throw new Error("No token found");
      }

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await TaskService.assignTaskToUser(
        taskId,
        userId,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to assign task");
      }

      // Update task status to "In progress"
      const statusResponse = await TaskService.updateTaskStatus(
        taskId,
        "In progress",
        token
      );
      if (!statusResponse.ok) {
        throw new Error("Failed to update task status");
      }

      alert("Task assigned successfully");
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: "In progress", userId } : task
        )
      );
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Error assigning task");
    }
  };

  const handleDelete = async (taskId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const token = sessionStorage.getItem("loggedInUserToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await TaskService.deleteTask(taskId, token);
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task.id !== taskId));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mb-8">
      {" "}
      {/* Add margin-bottom class here */}
      <table className="min-w-full divide-y divide-gray-200 text-black">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {new Date(task.date).toDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {new Date(task.time).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {task.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {task.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {task.comment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`px-4 py-2 rounded ${
                    task.status === "Done" || task.status === "In progress"
                      ? "bg-gray-500 text-white cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() => handleAssign(task.id)}
                  disabled={
                    task.status === "Done" || task.status === "In progress"
                  }
                >
                  Assign
                </button>
                {role === "admin" && (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksOverviewTable;
