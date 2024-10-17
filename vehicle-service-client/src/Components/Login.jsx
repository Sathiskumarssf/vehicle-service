import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Elements/Navbar";

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const [errors, setErrors] = useState({});
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error message when the user starts typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      console.log('Form Data:', formData); // Log form data for debugging
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate('/ReservationForm', { state: { email } });
  } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
  }
  
  };

  return (
     
    <div>
      <Navbar/>
       <div className="flex flex-col items-center bg-blue-300 justify-center min-h-[90vh]">
       
       <div className="bg-gray-200  pr-24 pl-24 pt-10 pb-10 rounded-3xl flex flex-col items-center justify-center">
         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
         <form className="flex flex-col w-full max-w-xs" onSubmit={handleSubmit}>
           <div className="mb-4">
             <input
               className="p-2 border rounded border-slate-400 w-full"
                             
               name="email"
               placeholder="Email"
               value={email}
               onChange={handleChange}
              
             />
             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
           </div>
           <div className="mb-4">
             <input
               className="p-2 border rounded border-slate-400 w-full"
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={handleChange}
                
             />
             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
           </div>
           <button
             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
             type="submit"
           >
             Login
           </button>
         </form>
           <h6>Want to login <a className="text-blue-500 " href="/register">Register</a></h6>
       </div>
     </div>
    </div>
  );
};

export default Login;
