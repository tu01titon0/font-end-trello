import React, { useEffect, useState } from "react";
import Column from "./Column/Column";
import data2 from "./MockData";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./BoardDetail.css";
import AddColumnBtn from "./AddColumnInput/AddColumnInput";
import NavBar from "../HomePage/Navbar/NavBar";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import ScrollContainer from "react-indiana-drag-scroll";
import { useParams } from "react-router";
import BoardService from "../../services/board.service";

const BoardDetail = () => {
  const [store, setStore] = useState(data2);
  const [board, setBoard] = useState();
  const boardId = useParams().id;

  useEffect(() => {
    BoardService.getBoardDetail(boardId)
      .then((res) => {
        setBoard(res.data.board);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [board]);

// console.log(board);

  const backgroundStyle = (board) => ({
    backgroundImage: board
      ? `url("../../../public/${board.backgroundImage}")`
      : "none",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });

  const handleDragEnd = (res) => {
    const startingIndex = res.source.index;
    const startingCol = res.source.droppableId;
    const typeOfItem = res.type;
    const endingIndex = res.destination.index;
    const endingCol = res.destination.droppableId;
    // console.log(
    //   "Starting Index: ",
    //   startingIndex,
    //   "\n",
    //   "Starting Column: ",
    //   startingCol,
    //   "\n",
    //   "Type: ",
    //   typeOfItem,
    //   "\n",
    //   "Ending Index: ",
    //   endingIndex,
    //   "\n",
    //   "Ending Col: ",
    //   endingCol,
    //   "\n"
    // );
    if (typeOfItem === "column") {
      const newData = [...board.columns];
      const [removedData] = newData.splice(startingIndex, 1);
      newData.splice(endingIndex, 0, removedData);
      // const idArray = newData.map(item => item._id);
      console.log(idArray);
      // console.log('data', newData);
      console.log('Board ID', board._id);
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
      <NavBar />
      <Stack className="main-board-container" style={backgroundStyle(board)}>
        <SideBar />
        <ScrollContainer
          vertical={false}
          ignoreElements="p, button, input, Draggable"
          className="scroll-container"
        >
          <Stack direction={"column"} height={"100%"}>
            <h1 className="board-nav-bar">
              {board && board.title ? board.title : null}
            </h1>
            <DragDropContext onDragEnd={handleDragEnd} style={{ flexGrow: 1 }}>
              <Droppable
                droppableId="root"
                type="column"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="board-container"
                  >
                    {board && board.columns ? board.columns.map((item, index) => (
                      <Column
                        props={item}
                        key={item._id}
                        index={index}
                        data={{ board, setBoard }}
                      />
                    )) : null}
                    {provided.placeholder}
                    <AddColumnBtn props={{ board, setBoard }} />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Stack>
        </ScrollContainer>
      </Stack>
    </>
  );
};

export default BoardDetail;
