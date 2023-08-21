import React, { useState } from "react";
import "./AddTaskInput.css";
import "../AddColumnInput/AddColumnInput.css";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BoardService from "../../../services/board.service";
import useBoard from "../../../store/useBoard";
import useColumn from "../../../store/useColumn";
import { socket } from "../../../miscs/socket";
import UpdateService from "../../../services/user.sevice";

const inputStyle = (state) => ({
  display: state ? "block" : "none",
});

const inputButton = (state) => ({
  display: !state ? "block" : "none",
});

const AddTaskInput = ({ props }) => {
  const { board, setBoard } = useBoard();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { column, setColumn } = useColumn();

  const handleOpenInput = () => {
    setOpen(true);
  };

  const handleClodeInput = () => {
    setOpen(false);
  };

  const handleInput = (val) => {
    setInput(val);
  };

  const addNewTaskToColumn = () => {
    const localUser = JSON.parse(localStorage.getItem("user"))._id;
    const isUser = board.users.find((item) => item.idUser._id === localUser);
    if (!isUser) return;
    if (input) {
      const data = [...props.data.column];
      const columnArray = data.findIndex(
        (item) => item._id === props.props._id
      );

      const user = JSON.parse(localStorage.getItem("user"));
      const message = `User ${user.userName} just added task ${input} to column ${data[columnArray].title}`;

      const taskContent = {
        taskTitle: input,
        columnId: data[columnArray]._id,
        boardId: props.board.boardId,
        notification: {
          message: message,
          time: Date.now().toString(),
          board: props.board.boardId,
          status: false,
        },
      };

      BoardService.addTaskToCol(taskContent)
        .then((res) => {
          data[columnArray].tasks.push(res.data.data);
          setColumn(res.data.board.columns);
          setBoard(res.data.board);
          socket.emit("drag", { board: res.data.board });

          UpdateService.getUserDetail(user._id)
            .then((res) => {
              socket.emit("noti", {
                notifications: res.data.user.notification,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
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
