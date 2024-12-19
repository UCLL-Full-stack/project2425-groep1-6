import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TaskService from "../../services/taskService";
import { Task } from "../../types";
import Header from "../../components/header";
import Head from "next/head";

const WorkerTasks: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchTasks = async () => {
        try {
          const token = sessionStorage.getItem("loggedInUserToken");
          if (!token) {
            throw new Error("No token found");
          }
          const response = await TaskService.getTasksByUserId(
            Number(userId),
            token
          );
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching tasks:", error);
        }
      };

      fetchTasks();
    }
  }, [userId]);

  const handleFinish = async (taskId: number) => {
    try {
      const token = sessionStorage.getItem("loggedInUserToken");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await TaskService.updateTaskStatus(
        taskId,
        "Done",
        token
      );
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: "Done" } : task
        )
      );
    } catch (error) {
      console.error("Error finishing task:", error);
      alert("Error finishing task");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Worker Tasks</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Worker Tasks</h1>
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
                Action
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={`px-4 py-2 rounded ${
                      task.status === "Done"
                        ? "bg-gray-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                    onClick={() => handleFinish(task.id)}
                    disabled={task.status === "Done"}
                  >
                    {task.status === "Done" ? "Finished" : "Finish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default WorkerTasks;
