import React, { useState } from "react";
import { Task, User } from "../../types";
import TaskService from "../../services/taskService";

const AddTaskForm: React.FC = () => {
  const [task, setTask] = useState<Omit<Task, "id">>({
    date: new Date(),
    time: new Date(),
    description: "",
    status: "",
    comment: "",
  });

  console.log("####### In Add Task form");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("loggedInUserToken");
      if (!token) {
        throw new Error("No token found");
      }
      await TaskService.createTask(task, token);
      alert("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={task.date.toISOString().split("T")[0]}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={task.time.toISOString().split("T")[1].substring(0, 5)}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <input
          type="text"
          name="status"
          value={task.status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          name="comment"
          value={task.comment}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
