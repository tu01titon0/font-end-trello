import Home from "./components/HomePage/Homepage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { createContext } from "react";
import { useAuthUser } from "react-auth-kit";

function App() {
  const auth = useAuthUser();

  return (
    <Routes>
      {auth() ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/signup" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}

export default App;
