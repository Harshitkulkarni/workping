import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="mx-36 h-screen ">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Home;
