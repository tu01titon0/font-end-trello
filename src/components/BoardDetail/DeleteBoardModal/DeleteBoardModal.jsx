import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import "./DeleteBoardModal.css";
import BoardService from "../../../services/board.service";
import useBoard from "../../../store/useBoard";
import useWorkspace from "../../../store/useWorkspace";
import useAlert from "../../../store/useAlert";
import { useNavigate } from "react-router-dom";

export default function DeleteBoardModal({ props }) {
  const { setWorkspace } = useWorkspace();
  const { board } = useBoard();
  const { setMessage, setOpenAlert } = useAlert();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => {
    props.setOpenDeleteBoardModal(false);
  };

  const handleDeleteBoard = (val) => {
    const data = {
      boardId: board._id,
    };
    BoardService.deleteBoard(board._id, currentUser._id)
      .then((res) => {
        setWorkspace(res.data.workspace);
        navigate(`/boards/${res.data.workspace._id}`);
        setMessage("Board deleted successfully!");
        setOpenAlert(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog
        open={props.openDeleteBoardModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="delete-board-modal">
          <DialogTitle
            style={{ backgroundColor: "transparent" }}
            id="alert-dialog-title"
          >
            {`Do you really want to delete this board named ${board.title}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will permanently remove the board from the workspace, all
              columns and tasks will be removed.
            </DialogContentText>
          </DialogContent>
          <Stack direction={"row"} justifyContent={"center"} mb={2} gap={10}>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleDeleteBoard()}
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
        </div>
      </Dialog>
    </div>
  );
}
