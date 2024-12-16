import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Task } from "@/types";
import TaskService from "@/services/taskService";
import TasksOverviewTable from "@/components/tasks/tasksOverviewTable";

const Tasks: React.FC = () => {
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
      </main>
    </>
  );
};

export default Tasks;
