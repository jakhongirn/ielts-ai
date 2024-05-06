"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { login, storeToken } = AuthActions();

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        await login(data.email, data.password)
            .json((json) => {
                storeToken(json.access, "access");
                storeToken(json.refresh, "refresh");
                toast.success("Logged in successfully");
                setIsLoading(false);
                router.push("/dashboard/");
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error("Failed login", err.json.detail);
                setError("root", { type: "manual", message: err.json.detail });
            });
    };

    return (
        <>
            <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
                <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
                    <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
                    <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
                        <Image
                            src="/images/shape/shape-dotted-light.svg"
                            alt="Dotted"
                            className="dark:hidden"
                            fill
                        />
                        <Image
                            src="/images/shape/shape-dotted-dark.svg"
                            alt="Dotted"
                            className="hidden dark:block"
                            fill
                        />
                    </div>

                    <motion.section
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: -20,
                            },

                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 1, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
                    >
                        <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                            Login to Your Account
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 ">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                                />
                                {errors.email && (
                                    <span className="text-xs text-red-600">
                                        Email is required
                                    </span>
                                )}
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                                />
                                {errors.password && (
                                    <span className="text-xs text-red-600">
                                        Password is required
                                    </span>
                                )}
                            </div>

                            {errors.root && (
                                <span className="text-xs text-red-600">
                                    {errors.root.message}
                                </span>
                            )}

                            <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
                                <div className="flex flex-wrap gap-4 md:gap-10">
                                    <div className="flex items-center"></div>
                                </div>

                                <button
                                    type="submit"
                                    aria-label="login with email and password"
                                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                                >
                                    Log in
                                    <svg
                                        className="fill-white"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                                            fill=""
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                                <p>
                                    Don't have an account?{" "}
                                    <Link
                                        className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
                                        href="/auth/signup"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </form>
                        <div className="mt-6 text-center">
                            <Link
                                href="/auth/password/reset-password"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </motion.section>
                </div>
            </section>
        </>
    );
};

export default Login;
