import React, { useId, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../Column/Column.css";
import TaskDetail from "../TaskDetail/TaskDetail";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";

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
                {props.item.description ? (
                  <div style={{ marginTop: "4px" }}>
                    <StackedBarChartOutlinedIcon sx={{ fontSize: "16px" }} />
                  </div>
                ) : null}
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
