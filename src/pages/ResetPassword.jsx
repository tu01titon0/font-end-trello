import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../components/HomePage/Navbar/NavBar";
import { Layout } from "antd";
import "./resetPassword.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState} from "react";

export default function ResetPassWord() {
  const [currentPasswordValid, setCurrentPasswordValid] = useState(true);

  const UpdatePassSchema = Yup.object().shape({
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu hiện tại")
      .test("check-current-password", "Mật khẩu hiện tại không đúng", async function (value) {
        if (!value || !formik.touched.password) return true; 
        try {
          const response = await fetch("/api/user/password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: value }),
          });
          const data = await response.json();
          setCurrentPasswordValid(data.isValid);
          return data.isValid;
        } catch (error) {
          setCurrentPasswordValid(false);
          return false;
        }
      }),
    newpassword: Yup.string().required("Vui lòng nhập mật khẩu mới"),
    confirmpassword: Yup.string().required("Vui lòng nhập lại mật khẩu mới"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: UpdatePassSchema,
    onSubmit: async (values) => {
      if (!currentPasswordValid) {
        return; 
      }

      try {
      
        const response = await fetch("/api/user/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
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
              name="newpassword"
              value={formik.values.newpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập mật khẩu mới"
              helperText={formik.touched.newpassword && formik.errors.newpassword}
              error={formik.touched.newpassword && !!formik.errors.newpassword}
            />
            <TextField
              className="password-input"
              required
              label="Nhập lại mật khẩu mới"
              name="confirmpassword"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập lại mật khẩu mới"
              helperText={
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? formik.errors.confirmpassword
                  : ""
              }
              error={
                formik.touched.confirmpassword &&
                !!formik.errors.confirmpassword
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
          </Box>
        </Box>
      </Layout>
    </>
  );
}
