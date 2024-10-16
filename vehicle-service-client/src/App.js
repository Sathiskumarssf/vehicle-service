import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'; 
import Login from "./Components/Login";
import Register from "./Components/Register";
import ReservationForm from "./Components/ReservationForm";
 

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ReservationForm" element={<ReservationForm />} />
        

    
      </Routes>
    </Router>
  );
}

export default App;
