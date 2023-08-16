import { Box, Button, Stack, TextField } from '@mui/material';
import { Layout, Typography, message } from 'antd';
import NavBar from '../components/HomePage/Navbar/NavBar';
import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect } from 'react';
export default function Profile(user) {
  
  useEffect( () => {
     axios
      .get(`http://localhost:8686/api/user/info`)
      .then(async (res) => {
        const result = await res.data.user;
        setUser(result);
      })
      .catch((error) => {
        console.log('Error ', error);
      });
  }, []);
  
  const formik = useFormik({
    initialValues: {
      userName: user.userName ,
      fullName: user.fullName,
      password: user.password,
      avataUrl: user.avataUrl,
      bio: user.bio,
      jobTitle: user.jobTitle,
      email: user.email,
    },
    onSubmit: async () => {
      try {
        await axios.put(`http://localhost:8686/api/user/info`, formik.values);
        message.success('Update thông tin thành công');
        formik.resetForm();
      } catch (error) {
        console.log(error);
        message.error('Update thất bại');
      }
    },
  });
  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          backgroundColor: '#1d2125',
        }}
      >
        <Stack direction={'column'}>
          <NavBar />
          <Stack
            direction={'row'}
            style={{
              maxWidth: '1200px',
              minWidth: '1200px',
              margin: '20px auto',
            }}
          ></Stack>
        </Stack>
        <Box className="login-box">
          <Box className="login-field" component={'form'}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
              alt="Login Logo"
              height={'30px'}
            />
            <Typography>
              <b style={{ fontSize: 20 }}> Chỉnh sửa tài khoản</b>
            </Typography>
            <TextField
              className="login-input"
              required
              label="User Name"
              name="userName"
              value={formik.values.userName}
              placeholder="Nhập tên đăng nhập"
            />

            <TextField
              className="login-input"
              required
              label="Full Name"
              name="fullName"
              value={formik.values.fullName}
              placeholder="Nhập đầy đủ họ tên"
            />
            <TextField
              className="login-input"
              required
              label="Password"
              name="Password"
              value={formik.values.password}
              placeholder="Nhập PassWord"
            />
            <TextField
              className="login-input"
              required
              label="AvatarUrl"
              name="AvatarUrl"
              value={formik.values.avataUrl}
              placeholder="Nhập Avatar"
            />
            <TextField
              className="login-input"
              required
              label="bio"
              name="Bio"
              value={formik.values.bio}
              placeholder="Nhập Bio"
            />
            <TextField
              className="login-input"
              required
              label="JobTitle"
              name="JobTitle"
              value={formik.values.jobTitle}
              placeholder="Nhập JobTitle"
            />

            <TextField
              className="login-input"
              required
              label="Email"
              name="Email"
              value={formik.values.email}
              placeholder="Nhập email"
            />

            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ width: '100%', marginTop: '20px', borderRadius: '6px' }}
            >
              <b style={{ fontSize: 20 }}>Update</b>
            </Button>
            <hr
              style={{
                marginTop: '40px',
                borderRadius: '0',
                border: 'none',
                borderBottom: '1px solid rgb(26 26 26 / 30%)',
              }}
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
}
