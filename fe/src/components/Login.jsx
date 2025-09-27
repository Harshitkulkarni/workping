import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "@/utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("harshit@gmail.com");
  const [password, setPassword] = useState("harshit@123");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-black mb-1">
          ✨ Log In
        </h2>

        <input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm focus:outline-none focus:ring focus:border-green-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm focus:outline-none focus:ring focus:border-green-400"
        />
        <p className="text-red-500 text-sm">{errorMessage}</p>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-lime-400  text-black font-semibold rounded-md py-3 transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
