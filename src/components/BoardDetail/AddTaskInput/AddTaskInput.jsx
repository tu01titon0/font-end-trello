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

    //   Viết logic add thêm task vào DB ở đây !!!!
  };

  const handleClodeInput = () => {
    setOpen(false);
  };

  const handleInput = (val) => {
    setInput(val);
  };

  const addNewTaskToColumn = () => {
    if (input) {
      const data = [...props.data.store];
      const columnArray = data.findIndex((item) => item.id === props.props.id);
      const taskContent = {
        id: `${props.props.title}-${data[columnArray].tasks.length + 1}`,
        taskTitle: input,
      };
      data[columnArray].tasks.push(taskContent);
      props.data.setStore(data);
      setInput("");
    }
  };

  return (
    <>
      <div style={inputStyle(open)}>
        <input
          type="text"
          className="input-field"
          placeholder="Add new task..."
          value={input}
          onChange={(e) => handleInput(e.target.value)}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <button
            className="add-tasks-item"
            onClick={() => addNewTaskToColumn()}
          >
            Add
          </button>
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
          <p className="white-text">Add new task...</p>
        </Stack>
      </button>
    </>
  );
};

export default AddTaskInput;
