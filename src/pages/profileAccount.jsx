import { Box, Button, Stack, TextField } from '@mui/material';
import { Layout, Typography, message } from 'antd';
import NavBar from '../components/HomePage/Navbar/NavBar';
import axios from 'axios';
import { useFormik } from 'formik';
export default function Profile() {
  const user = JSON.parse(localStorage.user)
  console.log(user)
  const formik = useFormik({
    initialValues: {
          fullName: user.fullName,
          avataUrl: user.avataUrl,
          bio: user.bio,
          jobTitle: user.jobTitle,
          email: user.email,
        },
        
    onSubmit: async () => {
      try {
        await axios.put(
          `http://localhost:8686/api/user/update`,
          formik.values
        );
        message.success('Update ngon');
        formik.resetForm();
      } catch (error) {
        console.log(error);
        message.error('Update ngu');
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
          <Box className="login-field" component={'form'}
           onSubmit={formik.handleSubmit}
          >
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
               <input
          type="file"
        />
        <br />
        <img src={formik.values.image} alt="" width={100} height={100} />

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
