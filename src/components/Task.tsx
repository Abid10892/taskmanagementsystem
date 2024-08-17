"use client"
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react';


interface TaskProps {
    task: {
        _id: string;
        title: string;
        description: string;
        dueDate: string;
        status: string;
    };
}


const Task: React.FC<TaskProps> = ({ task }) => {

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/delete-task/${id}`, {
                method: 'DELETE'
            });
            const response = await res.json();
            console.log(response);
            if (res.ok) {
                window.location.reload();
            }

        } catch (error: any) {
            console.log(error.message);

        }
    }

    const handleChange = async (id: string) => {
        try {
            const res = await fetch(`/api/update-status/${id}`, {
                method: 'PATCH'
            });
            if (res.ok) {
                window.location.reload();
            }

        } catch (error: any) {
            console.log(error.message);

        }
    }

    return (
        <div className='bg-indigo-600 text-white rounded p-5 w-[90%] md:w-[45%] flex flex-col items-center justify-center gap-4'>
            <h1 className='underline font-bold text-3xl text-center'>{task.title}</h1>
            <p>{task.description}</p>
            <div className='w-full h-[1px] bg-white'></div>
            <div className='flex w-full justify-around items-center gap-20'>
                <div className='flex gap-2 items-center justify-center'>
                    <input type='checkbox' id='checkbox' checked={task.status === 'completed' ? true : false} onChange={() => handleChange(task._id)} className='w-[18px] h-[18px] cursor-pointer accent-white' />
                    <label htmlFor='checkbox'>{task.status}</label>
                </div>
                <div className='flex gap-5'>
                    <Link href={`/edit-task/${task._id}`}><Pencil /></Link>
                    <button aria-label='delete' onClick={() => handleDelete(task._id)}><Trash2 /></button>
                </div>
            </div>
        </div>
    )
}


export default Task;