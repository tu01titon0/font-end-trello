import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import "./DeleteTaskModal.css";
import BoardService from "../../../../services/board.service";
import useBoard from "../../../../store/useBoard";
import useColumn from "../../../../store/useColumn";
import { socket } from "../../../../miscs/socket";

export default function DeleteTaskModal({ props, taskId, boardId }) {
  const { setBoard } = useBoard();
  const { setColumn } = useColumn();

  const handleClose = () => {
    props.setOpenModal(false);
  };

  const handleDeleteTask = (val) => {
    const data = {
      taskId: val,
      boardId: boardId,
    };
    BoardService.deleteTask(data)
      .then((res) => {
        setBoard(res.data.board);
        setColumn(res.data.board.columns);
        socket.emit("drag", { board: res.data.board });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog
        open={props.openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="delete-task-modal">
          <DialogTitle
            style={{ backgroundColor: "transparent" }}
            id="alert-dialog-title"
          >
            {"Do you really want to delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will permanently remove the task from the column as well as
              the board, any content, attachments inside will be deleted.
            </DialogContentText>
          </DialogContent>
          <Stack direction={"row"} justifyContent={"center"} mb={2} gap={10}>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleDeleteTask(taskId)}
            >
              Delete
            </button>
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </Stack>
          {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </div>
      </Dialog>
    </div>
  );
}
