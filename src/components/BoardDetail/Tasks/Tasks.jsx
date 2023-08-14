import React, { useId } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../Column/Column.css";

const dragStyle = (isDragging, draggableStyle) => ({
  transform: isDragging ? "rotate(3deg)" : null,
  backgroundColor: "#1a1a1a",
  padding: "8px",
  borderRadius: "6px",
});

const Tasks = ({ props }) => {

  const id = useId();

  return (
    <>
      <Draggable
        draggableId={props && props.item ? props.item._id : id}
        index={props.index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="tasks-display"
          >
            <div isDragging={snapshot.isDragging} style={{ flexGrow: 1 }}>
              <p
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                style={dragStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {props.item.content}
              </p>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Tasks;
