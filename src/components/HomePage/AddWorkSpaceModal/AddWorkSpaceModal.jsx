import {
  Box,
  Modal,
  Typography,
  TextField,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import "./AddWorkSpaceModal.css";
import WorkspaceService from "../../../services/workspace.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  border: "1px solid #111",
  boxShadow: 24,
  p: 4,
};

const AddWorkSpaceModal = ({ open, handleClose }) => {
  const [message, setMessage] = useState(null);
  const createWorkspaceSchema = Yup.object().shape({
    wsname: Yup.string().required("Vui lòng nhập lên workspace"),
    wsbio: Yup.string().required("Vui lòng nhập mô tả cho workspace"),
  });
  const formCreateWorkspace = useFormik({
    initialValues: {
      wsname: "",
      wsbio: "",
    },
    validationSchema: createWorkspaceSchema,
    onSubmit: (val) => {
      const data = {
        name: val.wsname,
        bio: val.wsbio,
        userId: JSON.parse(localStorage.getItem("user"))._id,
      };
      WorkspaceService.createWorkspace(data)
        .then((res) => {
          setMessage(res.data.message);
          setTimeout(() => {
            handleClose();
            setMessage(null);
          }, 500);
          formCreateWorkspace.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="add-workspace-modal"
        component={"form"}
        onSubmit={formCreateWorkspace.handleSubmit}
      >
        <Stack direction={"column"} gap={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Let's build a Workspace
          </Typography>
          <Typography variant="p">
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </Typography>
          <Typography variant="p">Workspace name</Typography>
          <div>
            <input
              style={{ width: "100%" }}
              id="workspace-name"
              className="workspace-create-input"
              type="text"
              name="wsname"
              onChange={formCreateWorkspace.handleChange}
              value={formCreateWorkspace.values.wsname}
              placeholder="Taco's Co"
            />
            {formCreateWorkspace.errors.wsname ? (
              <p style={{ fontSize: "12px", color: "#ff4f4b" }} mt={"5px"}>
                {formCreateWorkspace.errors.wsname}
              </p>
            ) : (
              <Typography
                style={{ fontSize: "12px" }}
                mt={"5px"}
                variant="body2"
                color="initial"
              >
                This is the name of your company, team or organization.
              </Typography>
            )}
          </div>
          <Typography variant="p">Workspace description Optional</Typography>
          <div>
            <textarea
              id="workspace-bio"
              className="workspace-create-input"
              style={{ height: "auto", width: "100%" }}
              name="wsbio"
              onChange={formCreateWorkspace.handleChange}
              value={formCreateWorkspace.values.wsbio}
              rows="10"
              cols="50"
            ></textarea>
            {formCreateWorkspace.errors.wsbio ? (
              <p style={{ fontSize: "12px", color: "#ff4f4b" }} mt={"5px"}>
                {formCreateWorkspace.errors.wsbio}
              </p>
            ) : (
              <Typography
                style={{ fontSize: "12px" }}
                variant="body2"
                color="initial"
              >
                Get your members on board with a few words about your Workspace.
              </Typography>
            )}
          </div>
          {message && (
            <Alert variant="filled" severity="success">
              {message}
            </Alert>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ height: "48px" }}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddWorkSpaceModal;
