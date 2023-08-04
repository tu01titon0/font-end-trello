import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginService from "../services/login.service";

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const signInSchema = Yup.object().shape({
    userName: Yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const formSignIn = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      const data = {
        userName: values.userName,
        password: values.password,
      };
      LoginService.userLoggegIn(data)
        .then((res) => {
          if (res.data.message) {
            setErrMessage(res.data.message);
          } else {
            signIn({
              token: res.data.accessToken,
              expiresIn: 60,
              tokenType: "Bearer",
              authState: res.data.userData.userName,
            });
            localStorage.setItem("user", JSON.stringify(res.data.userData));
            setOpen(true);
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Box className="login-box">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
      <Box
        className="login-field"
        component={"form"}
        onSubmit={formSignIn.handleSubmit}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
          alt="Login Logo"
          height={"30px"}
        />
        <Typography>Đăng nhập để sử dụng dịch vụ</Typography>
        <TextField
          className="login-input"
          required
          id="outlined-required"
          label="Username"
          name="userName"
          onChange={formSignIn.handleChange}
          value={formSignIn.values.userName}
          placeholder="Nhập tên đăng nhập"
          helperText={
            formSignIn.errors.userName ? formSignIn.errors.userName : null
          }
          error={formSignIn.errors.userName ? formSignIn.errors.userName : null}
        />
        <TextField
          className="login-input"
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          onChange={formSignIn.handleChange}
          value={formSignIn.values.password}
          autoComplete="Nhập mật khẩu"
          placeholder="Nhập mật khẩu"
          helperText={
            formSignIn.errors.password ? formSignIn.errors.password : null
          }
          error={formSignIn.errors.password ? formSignIn.errors.password : null}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            borderRadius: "6px",
            backgroundColor: "#579DFF",
          }}
        >
          Đăng nhập
        </button>
        <hr
          style={{
            marginTop: "40px",
            borderRadius: "0",
            border: "none",
            borderBottom: "1px solid rgb(26 26 26 / 30%)",
          }}
        />
        {errMessage && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {errMessage}
          </Alert>
        )}
        <p style={{ textAlign: "left", marginTop: "20px", color: "black" }}>
          Chưa có tài khoản? <Link to={"/signup"}>Đăng ký</Link> ngay!
        </p>
      </Box>
    </Box>
  );
};

export default Login;
