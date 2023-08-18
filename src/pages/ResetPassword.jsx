import {Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../components/HomePage/Navbar/NavBar";
import { Layout } from "antd";
import "./resetPassword.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState} from "react";
import UpdateService from "../services/user.sevice";
import useAlert from "../store/useAlert";



export default function ResetPassWord() {
  const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const [errMessage, setErrMessage] = useState("");
  const [message, setMessage] = useState("");
  const UpdatePassSchema = Yup.object().shape({
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu hiện tại")
     
      ,
      newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới"),
    checkNewPassword: Yup.string().required("Vui lòng nhập lại mật khẩu mới"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      checkNewPassword: "",
    },
    validationSchema: UpdatePassSchema,
    onSubmit: async (values) => {
      try {
          UpdateService.resetPassword(userInfo._id,values)
          .then((res) => {
            if (res.data.message) {
              setErrMessage(res.data.message);
              setMessage("");

            } else {
              setErrMessage("");

              setMessage(res.data.success);
              // navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "#1d2125",
        }}
      >
        <Stack direction={"column"}>
          <NavBar />
          <Stack
            direction={"row"}
            style={{
              maxWidth: "1200px",
              minWidth: "1200px",
            }}
          ></Stack>
        </Stack>
        <Box className="password-box ">
          <Box
            className="password-field"
            component={"form"}
            onSubmit={formik.handleSubmit}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
              alt="Login Logo"
              height={"30px"}
            />
            <Typography>
              <b style={{ fontSize: 20, color: "black" }}>
                {" "}
                Cập nhật mật khẩu{" "}
              </b>
            </Typography>
            <TextField
              className="password-input"
              required
              label="Mật khẩu hiện tại"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập mật khẩu hiện tại"
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : !currentPasswordValid
                  ? "Mật khẩu hiện tại không đúng"
                  : ""
              }
              error={
                (formik.touched.password && !!formik.errors.password) ||
                !currentPasswordValid
              }
            />
            <TextField
              className="password-input"
              required
              label="Mật khẩu mới"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập mật khẩu mới"
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              error={formik.touched.newPassword && !!formik.errors.newPassword}
            />
            <TextField
              className="password-input"
              required
              label="Nhập lại mật khẩu mới"
              name="checkNewPassword"
              value={formik.values.checkNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập lại mật khẩu mới"
              helperText={
                formik.touched.checkNewPassword && formik.errors.checkNewPassword
                  ? formik.errors.checkNewPassword
                  : ""
              }
              error={
                formik.touched.checkNewPassword &&
                !!formik.errors.checkNewPassword
              }
            />
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ width: "100%", marginTop: "20px", borderRadius: "6px" }}
            >
              UPDATE
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
        {message && (
          <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
            {message}
          </Alert>
        )}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
