import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../Column/Column.css";

const Tasks = ({ props }) => {
  return (
    <>
      <Draggable draggableId={props.item.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="tasks-display"
          >
            <div isDragging={snapshot.isDragging}>
              <h3
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {props.item.taskTitle}
              </h3>
            </div>
          </div>
        )}
          </Draggable>
              </>
  );
};

export default Tasks;
