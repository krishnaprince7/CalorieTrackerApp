import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const Navebar = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

  function click() {
    setShow(!show);
  }

  const linkClass = (path) =>
    `py-2 px-4 ${
      location.pathname === path ? "bg-orange-600 text-white" : "text-[#8d9091]"
    } font-bold transition-all duration-200`;

  return (
    <div className="bg-[#ffffff] w-full">
      <div className="max-w-[1240px] px-6 py-6 mx-auto shadow-2xl">
        <div className="flex sm:justify-around justify-between ">
          <div>
            <h1 className="text-black font-bold text-2xl">
              WE<span className="text-orange-600 ">ll</span>DONE
            </h1>
          </div>
          <ul className="sm:flex hidden gap-10">
            <Link to="/" className={linkClass("/")}>
              HOME
            </Link>
            <Link to="/register" className={linkClass("/register")}>
              SIGNUP
            </Link>
            <Link to="/login" className={linkClass("/login")}>
              LOGIN
            </Link>
          </ul>

          <div className="sm:hidden block cursor-pointer" onClick={click}>
            {show ? <IoMenu size={25} /> : <IoMdClose size={25} />}
          </div>
        </div>
        <ul
          className={
            show
              ? "hidden"
              : "flex flex-col gap-5 my-5 ml-2 transition-all ease-in-out duration-200"
          }
        >
          <Link to="/"  onClick={click} className={linkClass("/")}>
            HOME
          </Link>
          <Link to="/register"  onClick={click} className={linkClass("/register")}>
            SIGNUP
          </Link>
          <Link to="/login"  onClick={click} className={linkClass("/login")}>
            LOGIN
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navebar;
