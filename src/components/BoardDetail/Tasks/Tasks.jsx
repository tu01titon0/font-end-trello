import React, { useEffect, useId, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../Column/Column.css";
import TaskDetail from "../TaskDetail/TaskDetail";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import { Stack } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const dragStyle = (isDragging, draggableStyle) => ({
  transform: isDragging ? "rotate(3deg)" : null,
  backgroundColor: "#111111",
  padding: "8px",
  borderRadius: "6px",
});

const Tasks = ({ props }) => {
  const [openModal, setOpenModal] = useState(false);
  const [userCheck, setUserCheck] = useState();
  const id = useId();
  const boardUrl = `/b/${props.board.boardId}`;

  useEffect(() => {
    // User check
    const localUser = JSON.parse(localStorage.getItem("user"))._id;
    const isUser = props.board.board.users.find(
      (item) => item.idUser._id === localUser
    );
    setUserCheck(isUser);
  });

  // {console.log(props.item.files)}
  const image = props.item.files.find(
    (item) => item.type === "image/jpeg" || item.type === "image/png"
  );

  return (
    <>
      <Draggable
        draggableId={props && props.item ? props.item._id : id}
        index={props.index}
        isDragDisabled={userCheck ? null : true}
      >
        {(provided, snapshot) => (
          <section
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="tasks-display"
          >
            <div isDragging={snapshot.isDragging} style={{ flexGrow: 1 }}>
              <div
                className="task-title"
                onClick={() => userCheck && setOpenModal(true)}
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                style={dragStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <img
                  src={image && image.url}
                  alt=""
                  style={{ maxWidth: "100%", borderRadius: "4px 4px 0 0" }}
                />
                {props.item.content}
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  mt={"4px"}
                  gap={1}
                >
                  {props.item.description ? (
                    <div style={{ marginTop: "4px" }}>
                      <StackedBarChartOutlinedIcon sx={{ fontSize: "16px" }} />
                    </div>
                  ) : null}
                  {props.item && props.item.files.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <AttachmentIcon sx={{ fontSize: "18px" }} />
                      <p>{props.item.files.length}</p>
                    </div>
                  ) : null}
                  {props.item.comments && props.item.comments.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <ChatBubbleOutlineIcon sx={{ fontSize: "18px" }} />
                      <p>{props.item.comments.length}</p>
                    </div>
                  ) : null}
                </Stack>
              </div>
            </div>
          </section>
        )}
      </Draggable>
      <TaskDetail props={{ openModal, setOpenModal, props, boardUrl }} />
    </>
  );
};

export default Tasks;
