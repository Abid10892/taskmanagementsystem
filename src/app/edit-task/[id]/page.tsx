"use client"
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface LoginFormInputs {
    title: string;
    description: string;
    dueDate: string;
    gender: string;
}

const Page: React.FC = () => {


    const { id } = useParams();

    async function fetchData() {
        try {
            const res = await fetch('/api/edit-task', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(id),

            });
            if (!res.ok) {
                throw new Error('Failed to update task');
            }
            const response = await res.json();
            let { title, description, dueDate, status } = response.task;
            dueDate = new Date(dueDate).toISOString().slice(0, 10);

            return { title, description, dueDate, status }
        } catch (error: any) {
            console.log(error.message);

        }
    }



    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<LoginFormInputs>({
        defaultValues: () => fetchData()
    });

    const router = useRouter();



    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            data.id = id
            const res = await fetch("/api/update-task", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(data),
            });

            const response = await res.json();
            toast.success(response.message);
            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 1000)
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };



    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="bg-white flex flex-col items-center justify-center p-5 w-[70%] md:w-[40%] rounded-2xl shadow-[0_0_60px_0_rgba(0,0,0,0.5)]">
                <ToastContainer />
                <h2 className="text-center font-bold text-4xl text-indigo-600 mt-8">
                    Edit Task Here
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col items-center justify-center space-y-4 m-8 md:mb-1 p-8 pr-0 pl-0 md:gap-0 mt-4 w-[90%]"
                >
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    className="md:w-[400px] w-[90%] border-black border-b-2 rounded p-2 bg-gray-100 text-1xl focus:border-b-2 focus:border-indigo-600 focus:outline-none"
                                    id="title"
                                    {...field}
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                />
                                <p className="text-red-600">
                                    {errors.title && errors.title.message}
                                </p>
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <>
                                <textarea
                                    // type="text"
                                    placeholder="Type description here"
                                    className="md:w-[400px] w-[90%] border-black border-b-2 rounded p-2 bg-gray-100 text-1xl focus:border-b-2 focus:border-indigo-600 focus:outline-none"
                                    id="description"
                                    rows={4}
                                    {...field}
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                />
                                <p className="text-red-600">
                                    {errors.description && errors.description.message}
                                </p>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="dueDate"
                        render={({ field }) => (
                            <>
                                <input
                                    type="date"
                                    placeholder="Enter your password"
                                    className="md:w-[400px] w-[90%] border-black border-b-2 rounded p-2 bg-gray-100 text-1xl focus:border-b-2 focus:border-indigo-600 focus:outline-none"
                                    id="dueDate"
                                    {...field}
                                    {...register("dueDate", {
                                        required: "Date is required",
                                    })}
                                />
                                <p className="text-red-600">
                                    {errors.dueDate && errors.dueDate.message}
                                </p>
                            </>
                        )}
                    />

                    <div className="w-full flex justify-around">
                        <label>
                            <input type="radio" {...register('status', { required: true })} value="completed" className="mr-1" />
                            Completed
                        </label>

                        <label>
                            <input type="radio" {...register('status', { required: true })} value="pending" className="mr-1" />
                            Pending
                        </label>
                    </div>

                    {errors.status && <p>Please select at least one status.</p>}

                    <button
                        type="submit"
                        className="bg-indigo-600 md:w-[400px] w-[90%] p-4 rounded text-white font-semibold border-2 hover:bg-white hover:text-indigo-600 hover:border-2 hover:border-indigo-600 pl-8 pr-8 transition-all ease-linear duration-100 cursor-pointer"
                        disabled={!isValid}
                    >
                        Update Task
                    </button>
                </form>
                <Link href={'/'} className="text-indigo-600 font-bold hover:underline">View Task</Link>
            </div>
        </div>
    );
};

export default Page;
