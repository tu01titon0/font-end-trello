import React, { useState } from "react";
import Column from "./Column/Column";
import data2 from "./MockData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./BoardDetail.css";

const BoardDetail = () => {
  const [store, setStore] = useState(data2);

  const handleDragEnd = (res) => {
    const startingIndex = res.source.index;
    const startingCol = res.source.droppableId;
    const typeOfItem = res.type;
    const endingIndex = res.destination.index;
    const endingCol = res.destination.droppableId;
    console.log(
      "Starting Index: ",
      startingIndex,
      "\n",
      "Starting Column: ",
      startingCol,
      "\n",
      "Type: ",
      typeOfItem,
      "\n",
      "Ending Index: ",
      endingIndex,
      "\n",
      "Ending Col: ",
      endingCol,
      "\n"
    );
    if (typeOfItem === "column") {
      const newData = [...store];
      const [removedData] = newData.splice(startingIndex, 1);
      newData.splice(endingIndex, 0, removedData);
      setStore(newData);
    } else if (typeOfItem === "task") {
      const newData = [...store];
      const startedColumn = newData.findIndex(
        (item) => item.id === startingCol
      );
      const endedColumn = newData.findIndex((item) => item.id === endingCol);
      const [removed] = newData[startedColumn].tasks.splice(startingIndex, 1);
      if (newData[endedColumn].tasks.length === 0) {
        newData[endedColumn].tasks.push(removed);
      } else {
        newData[endedColumn].tasks.splice(endingIndex, 0, removed);
      }
      setStore(newData);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="root" type="column" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="board-container"
              style={{ backgroundColor: "red", padding: "10px" }}
            >
              {store.map((item, index) => (
                <Column props={item} key={item.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default BoardDetail;
