'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SignUp from "@/components/Auth/Signup";

type FormData = {
  email: string;
  username: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { register: registerUser } = AuthActions(); // Note: Renamed to avoid naming conflict with useForm's register

  const onSubmit = (data: FormData) => {
    registerUser(data.email, data.username, data.password)
      .json(() => {
        toast.success("Registered successfully");
        router.push("/auth/login/");
      })
      .catch((err) => {
        setError("root", {
          type: "manual",
          message: err.json.detail,
        });
      });
  };

  return (
    <SignUp />  
  );
};


export default RegisterPage;
