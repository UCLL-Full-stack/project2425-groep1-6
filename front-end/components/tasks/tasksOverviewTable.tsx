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
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Description</th>
          <th>Status</th>
          <th>Comment</th>
          <th>Assign</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{new Date(task.date).toDateString()}</td>
            <td>{new Date(task.time).toLocaleTimeString()}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>{task.comment}</td>
            <td>
              <button>Assign</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksOverviewTable;
