import Home from "./components/HomePage/Homepage.jsx";
import Login from "./pages/login.jsx";
import WorkSpaceSettings from "./components/WorkSpaceSettings/WorkSpaceSettings.jsx";
import SignUp from "./pages/signup.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profileAccount.jsx";
// import { createContext } from "react";
import { useAuthUser } from "react-auth-kit";

function App() {
  const auth = useAuthUser();

  return (
    <Routes>
      {auth() ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/settings/:id" element={<WorkSpaceSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Navigate to={"/"} />} />
          <Route path="/signup" element={<Navigate to={"/"} />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}
export default App;
