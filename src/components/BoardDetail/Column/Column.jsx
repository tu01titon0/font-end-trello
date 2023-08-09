import React from "react";
import "./Column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tasks from "../Tasks/Tasks";

const Column = ({ props }) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="column-display"
        >
          <div isDragging={snapshot.isDragging}>
            <h3 isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
              {props.title}
            </h3>
            <Droppable droppableId="column" type="task" direction="vertical">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {props.tasks.map((item, index) => (
                    <Tasks props={{ item, index }} key={item.id} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
