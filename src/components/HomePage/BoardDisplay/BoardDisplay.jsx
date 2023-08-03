import React from "react";
import "./BoardDisplay.css";
import RecentBoard from "./RecentBoard";
import YourWorkSpace from "./YourWorkSpace";

const BoardDisplay = () => {
  return (
    <div className="board-display-home">
      <RecentBoard />
      <hr style={{ border: "none", borderBottom: "1px solid #c7cfd8 " }} />
      <YourWorkSpace />
    </div>
  );
};

export default BoardDisplay;
