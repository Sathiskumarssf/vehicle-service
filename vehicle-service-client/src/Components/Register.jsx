import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NavbarforHome from "../Elements/NavbarforHome";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { username, email, contactNumber, country, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error message when the user starts typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
   
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!contactNumber) newErrors.contactNumber = "Contact number is required";
    else if (!/^\d{10}$/.test(contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }
    if (!country) newErrors.country = "Country is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
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
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <NavbarforHome />
      <div className="flex flex-col items-center bg-blue-300 justify-center min-h-[90vh]">
        <div className="bg-gray-200 pr-24 pl-24 pt-10 pb-10 rounded-3xl flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form className="flex flex-col w-full max-w-xs" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="p-2 border rounded border-slate-400 w-full"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
           
            <div className="mb-4">
              <input
                className="p-2 border rounded border-slate-400 w-full"
                type="email"
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
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
            </div>
            <div className="mb-4">
              <input
                className="p-2 border rounded border-slate-400 w-full"
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={handleChange}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
            <div className="mb-4 relative">
              <input
                className="p-2 border rounded border-slate-400 w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 cursor-pointer"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4 relative">
              <input
                className="p-2 border rounded border-slate-400 w-full"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3 cursor-pointer"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              type="submit"
            >
              Register
            </button>
            <h6>Want to login? <a className="text-blue-500" href="/">Login</a></h6>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
