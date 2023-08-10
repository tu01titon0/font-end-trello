import React, { useState } from "react";
import "./AddTaskInput.css";
import "../AddColumnInput/AddColumnInput.css";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const inputStyle = (state) => ({
  display: state ? "block" : "none",
});

const inputButton = (state) => ({
  display: !state ? "block" : "none",
});

const AddTaskInput = ({ props }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpenInput = () => {
    setOpen(true);
  };

  const handleClodeInput = () => {
    setOpen(false);
  };

  const handleInput = (val) => {
    setInput(val);
  };

  return (
    <>
      <div style={inputStyle(open)}>
        <input
          type="text"
          className="input-field"
          placeholder="Add new task..."
          onChange={(e) => handleInput(e.target.value)}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <button className="add-tasks-item">Add</button>
          <button
            className="close-input-btn"
            onClick={() => handleClodeInput()}
          >
            X
          </button>
        </Stack>
      </div>
      <button
        style={inputButton(open)}
        onClick={() => handleOpenInput()}
        className="add-tasks-btn"
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <AddIcon style={{ fontSize: "16px" }} />
          <p className="white-text">Add Task to {props}</p>
        </Stack>
      </button>
    </>
  );
};

export default AddTaskInput;
