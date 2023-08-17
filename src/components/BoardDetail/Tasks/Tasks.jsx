import React, { useId, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../Column/Column.css";
import TaskDetail from "../TaskDetail/TaskDetail";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import { Stack } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";

const dragStyle = (isDragging, draggableStyle) => ({
  transform: isDragging ? "rotate(3deg)" : null,
  backgroundColor: "#111111",
  padding: "8px",
  borderRadius: "6px",
});

const Tasks = ({ props }) => {
  const [openModal, setOpenModal] = useState(false);
  const id = useId();
  const boardUrl = `/b/${props.board.boardId}`;

  return (
    <>
      <Draggable
        draggableId={props && props.item ? props.item._id : id}
        index={props.index}
      >
        {(provided, snapshot) => (
          <section
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="tasks-display"
          >
            <div isDragging={snapshot.isDragging} style={{ flexGrow: 1 }}>
              <p
                className="task-title"
                onClick={() => setOpenModal(true)}
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                style={dragStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {props.item.content}
                {/* {console.log(props.item)} */}
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
                </Stack>
              </p>
            </div>
          </section>
        )}
      </Draggable>
      <TaskDetail props={{ openModal, setOpenModal, props, boardUrl }} />
    </>
  );
};

export default Tasks;
