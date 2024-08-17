'use client'
import Task from "@/components/Task";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  async function fetchData(user: string | null) {
    try {
      const res = await fetch(`/api/get-task`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const response = await res.json();

      setTasks(response.tasks)
    } catch (error: any) {
      console.log(error.message);

    }
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    fetchData(user);

  }, [])



  return (

    <main className="text-center p-5 pb-10 flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-3xl text-indigo-700">Hi, You can see your list of task here...</h1>
      <div className="flex gap-5 w-full flex-col md:flex-row items-center justify-center p-5 flex-wrap">
        {tasks?.length !== 0 ? tasks?.map((task) => (
          <Task key={task._id} task={task} />
        )) : <p className="font-bold">No Task Added yet, Please Add</p>}
      </div>
      <Link href={'/add-task'} className="border rounded p-3 pl-20 pr-20 border-indigo-700 w-[300px] text-center font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white">Add New Task</Link>
    </main>
  );
}
