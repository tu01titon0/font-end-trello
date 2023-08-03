import Home from "./components/HomePage/Homepage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { createContext } from "react";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
