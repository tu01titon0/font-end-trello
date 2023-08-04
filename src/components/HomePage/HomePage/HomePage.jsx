import React from "react";
import "./HomePage.css";
import Sidebar from "../SideBarHome";

const HomePage = () => {
  return (
    <div className="main-board-container">
      <Sidebar />
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
