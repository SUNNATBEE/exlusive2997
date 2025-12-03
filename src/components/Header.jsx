import React, { useState } from "react";
import Logo from "../assets/Exclusive.png";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="max-w-[1240px] w-full mx-auto px-5">

        <nav className="flex justify-between items-center py-4">

          <img src={Logo} alt="Exclusive" className="" />


          <div className="hidden md:flex items-center gap-5">
            <Link
              className="text-black text-lg font-semibold hover:border-b hover:text-red-500"
              to={"/"}
            >
              Home
            </Link>
            <Link
              className="text-black text-lg font-semibold hover:border-b hover:text-red-500"
              to={"/contact"}
            >
              Contact
            </Link>
            <Link
              className="text-black text-lg font-semibold hover:border-b hover:text-red-500"
              to={"/about"}
            >
              About
            </Link>
            <Link
              className="text-black text-lg font-semibold hover:border-b hover:text-red-500"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </div>


          <div className="hidden md:flex items-center gap-4">
            <label className="flex items-center gap-2 px-3 py-2 rounded-md bg-black">
              <svg
                className="h-4 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="bg-transparent outline-none text-sm"
                placeholder="Search"
              />
            </label>

            <Link to={"/wishlist"}>
              <CiHeart className="text-3xl text-black cursor-pointer" />
            </Link>

            <Link to={"/cart"}>
            <CiShoppingCart className="text-3xl text-black cursor-pointer" />
            </Link>          
            
            </div>


          <div className="flex md:hidden items-center gap-3">
            <CiHeart className="text-3xl text-black cursor-pointer" />
            <CiShoppingCart className="text-3xl text-black cursor-pointer" />

            <button onClick={() => setOpen((p) => !p)}>
              {open ? (
                <IoClose className="text-3xl text-black" />
              ) : (
                <GiHamburgerMenu className="text-3xl text-black" />
              )}
            </button>
          </div>
        </nav>


        <div
          className={`
            md:hidden 
            overflow-hidden border-t
            transition-all duration-300 
            ${open ? "max-h-96 opacity-100 translate-y-0 pt-4 pb-4" : "max-h-0 opacity-0 -translate-y-3"}
          `}
        >

          <label className="flex items-center gap-2 px-3 py-2 mb-3 rounded-md bg-black">
            <svg
              className="h-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="bg-transparent outline-none text-sm w-full"
              placeholder="Search"
            />
          </label>


          <div className="flex flex-col gap-2">
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1"
              to={"/"}
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1"
              to={"/contact"}
            >
              Contact
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1"
              to={"/about"}
            >
              About
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
