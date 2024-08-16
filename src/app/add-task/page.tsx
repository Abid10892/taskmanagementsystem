"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormInputs {
    title: string;
    description: string;
    dueDate: string;
    id: null;
}

const Page: React.FC = () => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors, isValid },
    } = useForm<LoginFormInputs>({ mode: "onChange" });

    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {

            data.id = localStorage.getItem("user");

            const res = await fetch("/api/add-task", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            });

            const response = await res.json();
            toast.success(response.message);
            reset();
            setTimeout(() => {

                router.push("/");
                router.refresh();
            }, 2000)
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/admin-home");
        } else {
            setFocus("title");
        }
    }, [router, setFocus]);

    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="bg-white flex flex-col items-center justify-center p-5 w-[70%] md:w-[40%] rounded-2xl shadow-[0_0_60px_0_rgba(0,0,0,0.5)]">
                <ToastContainer />
                <h2 className="text-center font-bold text-4xl text-indigo-600 mt-8">
                    Add Task Here
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col items-center justify-center space-y-4 m-8 p-8 pr-0 pl-0 md:gap-2 mt-4 w-[90%]"
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
                                    placeholder="Enter your Due Date"
                                    className="md:w-[400px] w-[90%] border-black border-b-2 rounded p-2 bg-gray-100 text-1xl focus:border-b-2 focus:border-indigo-600 focus:outline-none"
                                    id="dueDate"
                                    {...field}
                                    {...register("dueDate", {
                                        required: "Due Date is required",
                                    })}
                                />
                                <p className="text-red-600">
                                    {errors.dueDate && errors.dueDate.message}
                                </p>
                            </>
                        )}
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 disabled:bg-gray-500 md:w-[400px] w-[90%] p-4 rounded text-white font-semibold border-2 active:hover:bg-white active:hover:text-indigo-600 active:hover:border-2 active:hover:border-indigo-600 pl-8 pr-8 active:transition-all active:ease-linear active:duration-100 active:cursor-pointer"
                        disabled={!isValid}
                    >
                        Add Task
                    </button>
                </form>
                <Link href={'/'} className="text-indigo-600 font-bold hover:underline">View Task</Link>
            </div>
        </div>
    );
};

export default Page;
