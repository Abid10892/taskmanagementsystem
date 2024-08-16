"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormInputs {
    email: string;
    password: string;
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
            console.log(data);

            const res = await fetch("/api/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            });

            const response = await res.json();
            const user = JSON.stringify(response.user);
            localStorage.setItem("user", user);

            toast.success(response.message);
            reset();
            router.push("/");
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };


    return (
        <div className="flex items-center justify-center h-full mt-10">
            <div className="bg-white flex flex-col items-center justify-center p-5 w-[70%] md:w-[40%] rounded-2xl shadow-[0_0_60px_0_rgba(0,0,0,0.5)]">
                <ToastContainer />
                <h2 className="text-center font-bold text-4xl text-indigo-600 mt-8">
                    Login
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col items-center justify-center space-y-4 m-8 p-8 pr-0 pl-0 md:gap-2 mt-4 w-[90%]"
                >
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <>
                                <input
                                    type="email"
                                    placeholder="Enter your Email/Username"
                                    className="md:w-[400px] w-[90%] border-black border-b-2 rounded p-2 bg-gray-100 text-1xl focus:border-b-2 focus:border-indigo-600 focus:outline-none"
                                    id="email"
                                    {...field}
                                    {...register("email", {
                                        required: "Email/Username is required",
                                    })}
                                />
                                <p className="text-red-600">
                                    {errors.email && errors.email.message}
                                </p>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="md:w-[400px] w-[90%] border-black border-b-2 rounded p-2 bg-gray-100 text-1xl focus:border-b-2 focus:border-indigo-600 focus:outline-none"
                                    id="password"
                                    {...field}
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                                <p className="text-red-600">
                                    {errors.password && errors.password.message}
                                </p>
                            </>
                        )}
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 md:w-[400px] w-[90%] p-4 rounded text-white font-semibold border-2 hover:bg-white hover:text-indigo-600 hover:border-2 hover:border-indigo-600 pl-8 pr-8 transition-all ease-linear duration-100 cursor-pointer"
                        disabled={!isValid}
                    >
                        Login
                    </button>
                </form>
                <div className="flex gap-4">

                    <p>Don't have an account?</p><Link href={'/signup'} className="text-indigo-500">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
