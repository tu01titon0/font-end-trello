import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ThemeProvider} from "@mui/material/styles";
import {
    Alert,
    Box,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel, Link, MenuItem, Select,
    Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle.js";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [gender, setGender] = React.useState("");
    const [errMessage, setErrMessage] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#1a1a1a",
                        padding: "40px",
                    }}
                >
                    <img
                        alt="Main logo colored"
                        height={"80px"}
                        style={{ marginBottom: "10px" }}
                    />
                    <Typography component="h1" variant="h5" sx={{ color: "white" }}>
                        Đăng ký
                    </Typography>
                    {errMessage && (
                        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                            {errMessage}
                        </Alert>
                    )}
                    <Box
                        component="form"
                        onSubmit={formSignUp.handleSubmit}
                        noValidate
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="User Name"
                                    onChange={formSignUp.handleChange}
                                    value={formSignUp.values.userName}
                                    InputLabelProps={{
                                        style: { color: "#fff" },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {formSignUp.values.userName.length > 0 &&
                                                formSignUp.errors.userName === undefined ? (
                                                    <CheckCircleIcon color="success" />
                                                ) : null}
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={
                                        formSignUp.errors.userName
                                            ? formSignUp.errors.userName
                                            : null
                                    }
                                    error={
                                        formSignUp.errors.userName
                                            ? true
                                            : false
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="family-name"
                                    InputLabelProps={{
                                        style: { color: "#fff" },
                                    }}
                                    onChange={formSignUp.handleChange}
                                    value={formSignUp.values.fullName}
                                    helperText={
                                        formSignUp.errors.fullName
                                            ? formSignUp.errors.fullName
                                            : null
                                    }
                                    error={
                                        formSignUp.errors.fullName
                                            ? true
                                            : false
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {formSignUp.values.fullName.length > 0 &&
                                                formSignUp.errors.fullName === undefined ? (
                                                    <CheckCircleIcon color="success" />
                                                ) : null}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ minWidth: "100%" }}>
                                    <InputLabel id="demo-simple-select-helper-label">
                                        Gender
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={gender}
                                        label="Gender"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"female"}>Nữ</MenuItem>
                                        <MenuItem value={"male"}>Nam</MenuItem>
                                        <MenuItem value={"other"}>Khác</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    InputLabelProps={{
                                        style: { color: "#fff" },
                                    }}
                                    onChange={formSignUp.handleChange}
                                    value={formSignUp.values.password}
                                    helperText={
                                        formSignUp.errors.password
                                            ? formSignUp.errors.password
                                            : null
                                    }
                                    error={
                                        formSignUp.errors.password
                                            ? true
                                            : false
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {formSignUp.values.password.length > 0 &&
                                                formSignUp.errors.password === undefined ? (
                                                    <CheckCircleIcon color="success" />
                                                ) : null}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Đã có tài khoản? Đăng nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

// export default SignUpForm;