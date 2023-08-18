import { Box, Button, Stack, TextField } from "@mui/material";
import { Layout, Typography, message } from "antd";
import NavBar from "../components/HomePage/Navbar/NavBar";
import UpdateService from "../services/user.sevice"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  
  const user = JSON.parse(localStorage.user);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: user.fullName,
      bio: user.bio,
      jobTitle: user.jobTitle,
      email: user.email,
    },

    onSubmit: async () => {
     UpdateService.userUpdate(user._id,formik.values)
        .then (() => {
          const updatedUser = { ...user, ...formik.values };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        message.success("Update thành công");
        formik.resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  
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
        <Box className="login-box">
          <Box
            className="login-field"
            component={"form"}
            onSubmit={formik.handleSubmit}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
              alt="Login Logo"
              height={"30px"}
            />
            <Typography>
              <b style={{ fontSize: 20 }}> Chỉnh sửa tài khoản</b>
            </Typography>
            <TextField
              className="login-input"
              required
              label="Full Name"
              name="fullName"
              defaultValue={formik.values.fullName}
              onChange={formik.handleChange}
              placeholder="Nhập đầy đủ họ tên"
            />

            <TextField
              className="login-input"
              required
              label="bio"
              name="bio"
              onChange={formik.handleChange}
              defaultValue={formik.values.bio}
              placeholder="Nhập Bio"
            />
            <TextField
              className="login-input"
              required
              label="JobTitle"
              name="jobTitle"
              onChange={formik.handleChange}
              defaultValue={formik.values.jobTitle}
              placeholder="Nhập JobTitle"
            />

            <TextField
              className="login-input"
              required
              label="Email"
              onChange={formik.handleChange}
              name="email"
              defaultValue={formik.values.email}
              placeholder="Nhập email"
            />
            <br />

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
