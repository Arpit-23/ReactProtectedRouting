import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useUserAuth } from "../context/userAuthContext";


const Login = () => {
  const navigate = useNavigate();
  const [toggle,setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {logIn}=useUserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("../home");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className=" h-full flex flex-col items-center  w-screen mt-12">
    <form onSubmit={handleSubmit} className=" h-auto flex flex-col items-center mt-8 w-[35rem] gap-5 border-2 border-blue-500 rounded-md p-6 shadow-2xl shadow-blue-200">
      <h3 className=" text-2xl font-semibold text-blue-500">Login</h3>

      <div className=" flex flex-col w-full">
        <label>Email address</label>
        <input
          type="email"
          className="p-1 border-2 border-solid border-blue-500 rounded-md "
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full">
        <label>Password</label>
        <div className="relative">
        <input
          type={toggle?"text":"password"}
          className="p-1 border-2 border-solid border-blue-500 rounded-md w-full"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
              toggle?
              <LuEye size={23} className=" absolute right-3 top-1 "  onClick={()=>setToggle((prev) =>!prev)}/>
            :<LuEyeOff size={23} className=" absolute right-3 top-1 " onClick={()=>setToggle((prev) =>!prev)}/>
            }
        </div>
      </div>

      <div className="w-full">
        <button type="submit" className=" bg-blue-400 w-full p-2 rounded-lg text-white cursor-pointer">
          Submit
        </button>
      </div>
      <p className="">
        New user <Link to="/signup" className=" underline text-blue-950">Register Here</Link>
      </p>
    </form>
    </div>
  )
}

export default Login