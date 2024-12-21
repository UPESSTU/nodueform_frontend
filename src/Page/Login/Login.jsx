// pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Upes_logo from "../../assets/UPES-logo.svg";
import LoginInput from "../../Component/LoginInput";
import LoginButton from "../../Component/LoginButton";
import { signin } from "../../Backend/Helper";

const LoginPage = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { emailAddress, password };
    console.log(user);
    try {
      const res = await signin(user);
      // save the response in local storage
      localStorage.setItem("user", JSON.stringify(res.data));
      if (res.status === 200) {
        navigate("/dashboard");
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
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
            onChange={(value) => setemailAddress(value)}
          />

          <LoginInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />

          <LoginButton />
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
