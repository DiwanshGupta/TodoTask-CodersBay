import React, { useState } from "react";
import instance from "../utils/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/slice";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasSymbol;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (!validatePassword(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 8 characters long and contain at least one special character.",
      });
      return;
  }
    try {
      const response = await instance.post("/user/register", formData);
  
      if (response.status === 201) {
        const { user, token } = response.data;
        dispatch(loginSuccess({ user, token }));
                  
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have registered successfully.",
          timer: 2000,
          showConfirmButton: true,
        }).then(() => {
            navigate("/todo");  
        });
      }
    } catch (error) {
      let errorMessage = "Something went wrong! Please try again.";
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
  
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
    }
  };
  
  

  return (
    <div className="flex justify-center flex-col  items-center min-h-screen">
      <div className=" mb-3 text-xl md:text-2xl text-gray-500  font-bold">
        Welcome to <span className="animate-pulse pl-2">Todo DashBoard</span>
      </div>
      <form onSubmit={handleSubmit} className="bg-white/20 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
        <div className="relative">
        <input id="password" name="password" onChange={handleChange} type={show ? "text" : "password"} autoComplete="current-password" required
        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-5focus:border-indigo-500 sm:text-sm  `}
         placeholder="Enter your Password"
         />
         {!show ? (
             <AiOutlineEyeInvisible className="absolute cursor-pointer bottom-3 right-2" size={20}  onClick={() => setShow(true)} />
         ) : (
             <AiOutlineEye className="absolute cursor-pointer bottom-3 right-2" size={20} onClick={() => setShow(false)} />
         )}
         </div>
         <div className="mt-2 font-medium text-center  text-gray-500 mb-4">Already a user Pls
            <Link to="/login" className="text-blue-500 px-1 hover:underline">
            Login 
          </Link>
          here
        </div>
        <button type="submit" className="w-full  bg-gray-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
