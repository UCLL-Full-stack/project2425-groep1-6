import React, { useEffect, useState } from "react";
import TaskService from "../../services/taskService";
import { Task } from "../../types";

const TasksOverviewTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = sessionStorage.getItem("loggedInUserToken");
        if (!token) {
          throw new Error("No token found");
        }

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
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
            Assign
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(task.date).toDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(task.time).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.comment}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                Assign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksOverviewTable;
