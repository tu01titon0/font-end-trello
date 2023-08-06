import React, { useEffect, useState } from "react";
import useAlert from "../store/useAlert";
import { Alert, Snackbar } from "@mui/material";

const AlertMessage = () => {
  //   const { message, setMessage } = useAlert();
  const message = useAlert((state) => state.message);
  const [openAlertMess, setOpenAlertMess] = useState(false);

  useEffect(() => {
    if (message) {
      return setOpenAlertMess(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertMess(false);
  };

  return (
    <div>
      {message ? (
        <Snackbar open={openAlertMess} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default AlertMessage;
