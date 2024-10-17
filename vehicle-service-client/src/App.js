import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'; 
import Login from "./Components/Login";
import Register from "./Components/Register";
import ReservationForm from "./Components/ReservationForm";
import ReservationList from "./Components/ReservationList";
import Profile from './Components/Profile';
 

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ReservationForm" element={<ReservationForm /> } />  
        <Route path="/ReservationList" element={<ReservationList /> } />  
        <Route path="/Profile" element={<Profile /> } />  
        

    
      </Routes>
    </Router>
  );
}

export default App;
