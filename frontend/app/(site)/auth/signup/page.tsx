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
  return (
    <SignUp />  
  );
};


export default RegisterPage;
