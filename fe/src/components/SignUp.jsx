import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "@/utils/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    //fullName, email, password, role,type
    email: "",
    fullName: "",
    password: "",
    phone: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await axios.post("http://localhost:7777/signup", formData, {
      withCredentials: true,
    });
    dispatch(addUser(res.data.data));
    return navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-black mb-1">
          ✨ Sign Up
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Work email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm focus:outline-none focus:ring focus:border-green-400"
          required
        />

        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm focus:outline-none focus:ring focus:border-green-400"
        />

        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm focus:outline-none focus:ring focus:border-green-400"
        />

        <div className="flex gap-2 mb-4">
          <div className="w-1/3 flex items-center border border-gray-300 rounded-md px-3 text-sm">
            🇮🇳 +91
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-2/3 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring focus:border-green-400"
            required
          />
        </div>

        <select
          name="type"
          value={formData.hiringPlan}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm text-gray-500 focus:outline-none focus:ring focus:border-green-400"
        >
          <option value="">Role</option>
          <option value="developer">Developer</option>
          <option value="tester">Tester</option>
        </select>

        <button
          type="submit"
          className="w-full bg-lime-400  text-black font-semibold rounded-md py-3 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
