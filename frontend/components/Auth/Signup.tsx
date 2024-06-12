'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  first_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { register: registerUser } = AuthActions(); // Note: Renamed to avoid naming conflict with useForm's register

  const onSubmit = async (data: FormData) => {
    try {
      const response = await registerUser(data.first_name, data.email, data.username, data.password, data.password_confirmation);
      if (response.ok) {
        toast.success("Registration successful");
        router.push("/auth/login/");
      } else {
        const errorData = await response.json();
        setError("root", {
            type: "manual",
            message: errorData.detail,
        });
    }
} catch (err) {
    setError("root", {
        type: "manual",
        message: err.message || "An error occurred",
    });
}
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-1/3">
        <h3 className="text-2xl font-semibold">Register your account</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
            <label className="block" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name", { required: "First Name is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.first_name && (
              <span className="text-xs text-red-600">
                {errors.first_name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.email && (
              <span className="text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.username && (
              <span className="text-xs text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password_confirmation">
              Password Confirmation
            </label>
            <input
              type="password"
              placeholder="Password Confirmation"
              {...register("password_confirmation", { required: "Password confirmation is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.password_confirmation && (
              <span className="text-xs text-red-600">
                {errors.password_confirmation.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Sign up
            </button>
          </div>
          {errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
        </form>
      </div>
    </div>
  );
};


export default SignUp;
