'use client';

import React from 'react';
import Link from 'next/link';
import AuthForm from '../../components/AuthForm';
import { signup } from '../../api/authService';

const SignUp = () => {
  const handleSignup = async (credentials) => {
    try {
      await signup(credentials);
      // Handle successful login, e.g., redirect or set auth context
    } catch (error) {
      console.error("Sign up failed:", error);
      // Optionally handle login failure, e.g., display an error message
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <AuthForm isLogin={false} onSubmit={handleSignup} />
    </div>
      </>
  );
};

export default SignUp;
