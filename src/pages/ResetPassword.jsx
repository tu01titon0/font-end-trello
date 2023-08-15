import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../components/HomePage/Navbar/NavBar";
import { Layout, message } from "antd";
import "./resetPassword.css";
import * as Yup from "yup";

import { useFormik } from "formik";
import cookieParse from "../services/cookieparse.service";
import { useNavigate } from "react-router-dom";

export default function ResetPassWord() {
  const updateAccessSchema = Yup.object().shape({
    password: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
    newpassword: Yup.string().required("Vui lòng nhập mật khẩu mới"),
    confimpassword: Yup.string().required("Vui lòng nhập lại mật khẩu mới "),
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      confimpassword: "",
    }, validationSchema: updateAccessSchema,
    onSubmit: async (values) => {
      try {
        const authKey = cookieParse()._auth;
        const response = await fetch("http://localhost:8686/api/user/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,

          },
          body: JSON.stringify({
            password: values.password,
            newPassword: values.newpassword,
            checkNewPassword: values.confimpassword,
          }),
        });

        const data = await response.json();
        message.info(data.message)                           
        formik.resetForm();
        setTimeout(() => {
          navigate("/");
        }, 700);
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
              }
              error={formik.touched.password && !!formik.errors.password}
            />
            <TextField
              className="password-input"
              required
              label="Mật khẩu mới"
              name="newpassword"
              value={formik.values.newpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập mật khẩu mới"
              helperText={
                formik.touched.newpassword && formik.errors.newpassword
              }
              error={formik.touched.newpassword && !!formik.errors.newpassword}
            />
            <TextField
              className="password-input"
              required
              label="Nhập lại mật khẩu  mới"
              name="confimpassword"
              value={formik.values.confimpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập mật khẩu lại mới"
              helperText={
                formik.touched.confimpassword && formik.errors.confimpassword
              }
              error={formik.touched.confimpassword && !!formik.errors.confimpassword}
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
          </Box>
        </Box>
      </Layout>
    </>
  );
}
