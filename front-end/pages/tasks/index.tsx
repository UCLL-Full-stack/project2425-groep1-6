import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Task, User } from "@/types";
import TaskService from "@/services/taskService";
import TasksOverviewTable from "@/components/tasks/tasksOverviewTable";
import AddTaskForm from "@/components/tasks/addTaskForm";
import UserService from "@/services/userService";
import { jwtDecode } from "jwt-decode";

const Tasks: React.FC = () => {
  //const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<String | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("loggedInUserToken");
      if (token) {
        try {
          // Decode het token om het userId te extraheren
          const decodedToken: any = jwtDecode(token);
          const role = decodedToken.role;
  
          setRole(role);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
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
        <section>
          <h2>Tasks Overview</h2>
          <TasksOverviewTable />
        </section>
        {role === "admin" && <AddTaskForm/>}
      </main>
    </>
  );
};

export default Tasks;
