import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import BoardService from "../../../services/board.service";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import "./AddColumnInput.css";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import useColumn from "../../../store/useColumn";
import useBoard from "../../../store/useBoard";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function AddColumnBtn({ column }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [columnName, setColumnName] = React.useState();
  const { setColumn } = useColumn();
  const { setBoard } = useBoard();

  if (column & column.column) {
    const columnToAdd = [...column.column];
  }

  const addColumnToBoard = () => {
    const dataToBe = {
      board: column.boardId,
      column: columnName,
    };

    BoardService.addColumnToBoard(dataToBe)
      .then((res) => {
        setBoard(res.data.data);
        setColumn(res.data.data.columns);
      })
      .catch((err) => {
        console.log(err);
      });
    setColumnName("");
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion onChange={handleChange("panel1")} className="add-column-btn">
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <p className="white-text">Thêm cột mới +</p>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              value={columnName}
              style={{ color: "white" }}
              onChange={(e) => setColumnName(e.target.value)}
            />
          </FormControl>
          <button
            onClick={() => addColumnToBoard()}
            style={{ width: "50%", marginTop: "15px" }}
          >
            Add
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
