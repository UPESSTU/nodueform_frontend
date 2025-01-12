import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Upes_logo from "../../assets/UPES-logo.svg";
import LoginInput from "../../Component/LoginInput";
import LoginButton from "../../Component/LoginButton";
import { signin } from "../../Backend/Helper";

const LoginPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous error
    const user = { emailAddress, password };

    try {
      const res = await signin(user);

      if (res.status === 200) {
        // Save the response in local storage
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      } else {
        setError(res.data.error || "An unknown error occurred.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error || "Failed to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-8 relative">
      {/* Logo at the top-left corner */}
      <div className="absolute top-4 left-4">
        <img src={Upes_logo} alt="UPES Logo" className="w-36 h-auto" />
      </div>

      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <form
          onSubmit={handleLogin}
          className="flex flex-col font-semibold text-slate-700"
        >
          <h1 className="z-10 self-start -mt-1.5 text-3xl">Login</h1>

          <LoginInput
            label="User ID"
            id="userId"
            placeholder="Enter Id"
            value={emailAddress}
            onChange={(value) => setEmailAddress(value)}
          />

          <LoginInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />

          {/* Render error message */}
          {error && (
            <div className="p-2 mt-2 text-red-500 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}

          <LoginButton disabled={loading} />
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-primary hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
