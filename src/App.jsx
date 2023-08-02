
import Home from './components/HomePage/Homepage.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { createContext } from 'react';
export const AuthContext = createContext();

function App() {
  return (
   <div>
    <AuthContext.Provider>
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthContext.Provider>
   </div>
  );
}

export default App;
