'use client';

import AuthForm from '../../components/AuthForm';
import { login } from '../../api/authService';

const Login = () => {
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      console.log("SUCCESS");
      // Handle successful login, e.g., redirect or set auth context
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally handle login failure, e.g., display an error message
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <AuthForm isLogin onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
