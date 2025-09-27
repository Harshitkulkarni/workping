import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "@/utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  return (
    <div className="flex  justify-between">
      <div className=" flex justify-between mt-10 broder border-1 border-gray-300 rounded-2xl gap-15 ">
        <h1 className="text-4xl font-extrabold text-[#102713] m-5 px-4">
          WorkPing
        </h1>

        <div className="flex items-center gap-16  flex-row list-none m-5 px-4 font-bold text-[#102713] text-xl ">
          <li
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:bg-[#9ce56d] hover:border border-[#102713] py-1.5 rounded-md px-6"
          >
            Dashboard
          </li>
          <li
            onClick={() => navigate("/updates")}
            className="cursor-pointer hover:bg-[#9ce56d] hover:border border-[#102713] py-1.5 rounded-md px-6"
          >
            Daily Updates
          </li>
        </div>
      </div>
      {user ? (
        <div className="broder border-1 border-gray-300 rounded-2xl mt-10 flex items-center  list-none gap-16 m-5 px-4 text-xl font-bold text-[#102713]">
          <li>{user.fullName}</li>
          <li
            className="flex items-center gap-2 hover:bg-[#9ce56d] hover:border border-[#102713] py-1.5 rounded-md px-6 cursor-pointer"
            onClick={handleLogout}
          >
            <FaUser />
            Log Out
          </li>
        </div>
      ) : (
        <div className="broder border-1 border-gray-300 rounded-2xl mt-10 flex items-center  list-none gap-16 m-5 px-4 text-xl font-bold text-[#102713]">
          <li
            className="flex items-center gap-2 hover:bg-[#9ce56d] hover:border border-[#102713] py-1.5 rounded-md px-6 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <FaUser />
            Login
          </li>

          <Button
            variant="outline"
            onClick={() => navigate("/signup")}
            className="bg-[#9ce56d] text-xl font-bold text-[#102713] flex items-center p-5 border border-[#102713] px-6 cursor-pointer"
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
