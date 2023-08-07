import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
// import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import AuthService from "../services/auth.service.js";

const SignUp = () => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");

  const signUpSchema = Yup.object().shape({
    userName: Yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    fullName: Yup.string().required("Vui lòng nhập full name"),
    email: Yup.string().required("Vui lòng nhập Email"),
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const formSignIn = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const data = {
        userName: values.userName,
        password: values.password,
        fullName: values.fullName,
        email: values.email,
      };
      AuthService.createUser(data)
        .then((res) => {
          console.log(res);
          if (res.data.message) {
            setErrMessage(res.data.message);
          } else if (res.data.success) {
            setOpen(true);
            setTimeout(() => {
              navigate("/login");
            }, 700);
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
          Đăng ký thành công!
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
        <Typography>Đăng Ký Tài Khoản</Typography>
        <TextField
          className="login-input"
          required
          label="User Name"
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
          required
          label="Full Name"
          name="fullName"
          onChange={formSignIn.handleChange}
          value={formSignIn.values.fullName}
          placeholder="Nhập tên của bạn"
          helperText={
            formSignIn.errors.fullName ? formSignIn.errors.fullName : null
          }
          error={formSignIn.errors.fullName ? formSignIn.errors.fullName : null}
        />
        <TextField
          className="login-input"
          required
          id="outlined-required"
          label="Email"
          name="email"
          type="email"
          onChange={formSignIn.handleChange}
          value={formSignIn.values.email}
          placeholder="Nhập tên của bạn"
          helperText={formSignIn.errors.email ? formSignIn.errors.email : null}
          error={formSignIn.errors.email ? formSignIn.errors.email : null}
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
        <Button
          variant="outlined"
          type="submit"
          style={{ width: "100%", marginTop: "20px", borderRadius: "6px" }}
        >
          Đăng Ký
        </Button>
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
        <Typography style={{ textAlign: "left", marginTop: "20px" }}>
          Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link> ngay!
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
