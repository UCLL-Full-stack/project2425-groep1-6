import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TaskService from "@/services/taskService";
import TasksOverviewTable from "@/components/tasks/tasksOverviewTable";
import AddTaskForm from "@/components/tasks/addTaskForm";
import { jwtDecode } from "jwt-decode";

const Tasks: React.FC = () => {
  const [role, setRole] = useState<String | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect is running"); // Debugging log

    const fetchUser = async () => {
      const token = sessionStorage.getItem("loggedInUserToken");
      console.log("Token:", token); // Debugging log

      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const role = decodedToken.role;
          const userId = decodedToken.id;

          setRole(role);
          setUserId(userId);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else {
        console.log("No token found"); // Debugging log
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Tasks</h1>
        {role === "worker" && (
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => router.push(`/tasks/${userId}`)}
          >
            My tasks
          </button>
        )}
        <section>
          <h2>Tasks Overview</h2>
          <TasksOverviewTable />
        </section>
        {role === "admin" && <AddTaskForm />}
      </main>
    </>
  );
};

export default Tasks;
