import React, { useEffect, useState } from "react";
import "./Column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "../Tasks/Tasks";
import AddTaskInput from "../AddTaskInput/AddTaskInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useBoard from "../../../store/useBoard";
import useColumn from "../../../store/useColumn";
import BoardService from "../../../services/board.service";
import ClearIcon from "@mui/icons-material/Clear";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { socket } from "../../../miscs/socket";

const Column = ({ props, index, data, board }) => {
  const [popup, setPopup] = useState();
  const columnId = props._id;
  const { setBoard } = useBoard();
  const { column, setColumn } = useColumn();
  const [userRole, setUserRole] = useState();
  const [showEdit, setShowEdit] = useState({ status: false });

  // User check
  const localUser = JSON.parse(localStorage.getItem("user"))._id;
  const isUser = board.board.users.find(
    (item) => item.idUser._id === localUser
  );

  const handleColTitleChange = (val) => {
    setShowEdit({ message: val, status: true });
  };

  const handleUpdateColTitle = () => {
    if (showEdit.message) {
      const data = {
        title: showEdit.message,
        columnId: props._id,
        boardId: board.boardId,
      };
      BoardService.changeColName(data)
        .then((res) => {
          setBoard(res.data.board);
          setColumn(res.data.board.columns);
          setShowEdit({ status: false });
          socket.emit("drag", { board: res.data.board });
        })
        .catch((err) => console.log(err));
      // Xử lý logic update tên cột ở đây
    }
  };

  // Kiểm tra role của người dùng trong board

  useEffect(() => {
    BoardService.getBoardDetail(board.boardId)
      .then((res) => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const currentUser = res.data.board.users.find(
          (item) => item.idUser._id === localUser._id
        );
        if (!currentUser) return;
        setUserRole(currentUser.role);
      })
      .catch((err) => console.log(err));
  }, [column]);

  // Bật tắt pop up menu của col

  const handleColumnSetting = () => {
    if (!popup) {
      setPopup(columnId);
    } else {
      setPopup(null);
    }
  };

  // Xóa col

  const handleDeleteColumn = (val) => {
    const data = {
      localUser: JSON.parse(localStorage.getItem("user")),
      boardId: board.boardId,
      colId: val,
    };
    BoardService.deleteCol(data)
      .then((res) => {
        setBoard(res.data.board);
        setColumn(res.data.board.columns);
        socket.emit("drag", { board: res.data.board });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Draggable
      type="column"
      draggableId={props._id}
      index={index}
      key={props._id}
      isDragDisabled={isUser ? null : true}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="column-display"
        >
          <section
            isDragging={snapshot.isDragging}
            style={{ height: "100%", minHeight: "100%" }}
          >
            <Stack
              direction={"row"}
              alignItems={"start"}
              justifyContent={"space-between"}
            >
              <div
                style={{
                  display: showEdit.status ? "flex" : "none",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <input
                  type="text"
                  className="column-title-edit"
                  value={showEdit.message}
                  onChange={(e) => handleColTitleChange(e.target.value)}
                />
                <CheckOutlinedIcon
                  className="edit-col-title-icon check-col-icon"
                  onClick={() => handleUpdateColTitle()}
                />
                <ClearIcon
                  className="edit-col-title-icon cancel-col-icon"
                  onClick={() =>
                    setShowEdit({ message: props.title, status: false })
                  }
                />
              </div>
              <h3
                className="column-title"
                style={{ display: showEdit.status ? "none" : null }}
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                key={props._id}
                onClick={() =>
                  userRole &&
                  setShowEdit({ message: props.title, status: true })
                }
              >
                {props && props.title ? props.title : "None"}
              </h3>
              {userRole === "admin" && (
                <div style={{ position: "relative" }}>
                  {popup ? (
                    <CloseIcon
                      className="edit-col-title"
                      onClick={() => handleColumnSetting()}
                    />
                  ) : (
                    <MoreHorizIcon
                      className="edit-col-title"
                      onClick={() => handleColumnSetting()}
                    />
                  )}
                  <div
                    className="col-settings-popup"
                    style={{ display: popup === columnId ? null : "none" }}
                  >
                    <button className="column-settings-btn">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"6px"}
                      >
                        <DriveFileRenameOutlineIcon fontSize="12px" />
                        Edit Column Name
                      </Stack>
                    </button>
                    <button
                      className="column-settings-btn"
                      onClick={() => handleDeleteColumn(columnId)}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"6px"}
                      >
                        <DeleteOutlinedIcon fontSize="12px" />
                        Delete Column
                      </Stack>
                    </button>
                  </div>
                </div>
              )}
            </Stack>
            <Droppable droppableId={props._id} type="task" direction="vertical">
              {(provided) => (
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="content-scroll-bar"
                    style={{ minHeight: "100%" }}
                  >
                    {props.tasks &&
                      props.tasks.map((item, index) => (
                        <Tasks
                          props={{ item, index, board, data, columnId }}
                          key={item._id}
                        />
                      ))}
                    {provided.placeholder}
                    <AddTaskInput props={{ props, data, board }} />
                  </div>
                </>
              )}
            </Droppable>
          </section>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
