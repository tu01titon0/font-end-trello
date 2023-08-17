import { Alert, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import useAlert from "../store/useAlert";
import UpdateService from "../services/user.sevice";

const SentNewPass = () => {
  const navigate = useNavigate();

  const [errMessage, setErrMessage] = useState("");
  const { setMessage } = useAlert();

  const signInSchema = Yup.object().shape({
    userEmail: Yup.string().required("Vui lòng nhập email"),
  });

  const formSignIn = useFormik({
    initialValues: {
      userEmail: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      const data = {
        userEmail: values.userEmail,
      };
      UpdateService.sendNewPassword(data)
        .then((res) => {
          if (res.data.message) {
            setErrMessage(res.data.message);
          } else {
            setMessage("Gửi email thay đổi mật khẩu thành công");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Box className="login-box">
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
          label="userEmail"
          name="userEmail"
          onChange={formSignIn.handleChange}
          value={formSignIn.values.userEmail}
          placeholder="Nhập email cấp lại mật khẩu mới"
          helperText={
            formSignIn.errors.userEmail ? formSignIn.errors.userEmail : null
          }
          error={
            formSignIn.errors.userEmail ? formSignIn.errors.userEmail : null
          }
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
          Gửi email cấp lại mật khẩu
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

export default SentNewPass;
