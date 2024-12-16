import React, { useEffect, useState } from "react";
import TaskService from "../../services/taskService";
import { Task } from "../../types";

const TasksOverviewTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskService.getAllTasks();
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Description</th>
          <th>Status</th>
          <th>Comment</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksOverviewTable;
