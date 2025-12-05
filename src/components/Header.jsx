// src/components/Header.jsx
import React, { useState } from "react";
import Logo from "../assets/Exclusive.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [open, setOpen] = useState(false);
  
  // Redux'dan user ma'lumotlarini olish
  const reduxUser = useSelector((state) => state.saginAuth.user);
  
  // LocalStorage'dan user ma'lumotlarini olish
  const savedUser = localStorage.getItem("user");
  const parsedUser = savedUser ? JSON.parse(savedUser) : null;
  
  // User mavjudligini tekshirish
  const isAuthenticated = !!(reduxUser || parsedUser);
  const user = reduxUser || parsedUser;

  // Cart va Wishlist count'larni olish (agar mavjud bo'lsa)
  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);
  
  // Agar cart state mavjud bo'lsa, count'ni olish
  const cartCount = cartState?.items?.length || 0;
  const wishlistCount = wishlistState?.items?.length || 0;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="max-w-[1240px] w-full mx-auto px-5">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Exclusive" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
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
          </div>

          {/* Icons Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <label className="flex items-center gap-2 px-3 py-2 rounded-md bg-black">
              <svg className="h-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" className="bg-transparent outline-none text-sm" placeholder="Search" />
            </label>

            {/* Wishlist with badge */}
            <Link to={"/wishlist"} className="relative">
              <CiHeart className="text-3xl text-black cursor-pointer hover:text-red-500 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with badge */}
            <Link to={"/cart"} className="relative">
              <CiShoppingCart className="text-3xl text-black cursor-pointer hover:text-red-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER ICON - LOGIN QILGAN BO'LSA Account GA, BO'LMASA SAGINUP GA */}
            <Link to={isAuthenticated ? "/account" : "/signup"}>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 font-bold">
                      {user?.firstName?.[0] || user?.name?.[0] || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {user?.firstName || user?.name || "User"}
                  </span>
                </div>
              ) : (
                <CiUser className="text-3xl text-black cursor-pointer hover:text-red-500 transition-colors" />
              )}
            </Link>
          </div>

          {/* Mobile View */}
          <div className="flex md:hidden items-center gap-3">
            {/* Wishlist Mobile with badge */}
            <Link to={"/wishlist"} className="relative">
              <CiHeart className="text-3xl text-black cursor-pointer" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Mobile with badge */}
            <Link to={"/cart"} className="relative">
              <CiShoppingCart className="text-3xl text-black cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER ICON MOBILE - LOGIN QILGAN BO'LSA Account GA, BO'LMASA SAGINUP GA */}
            <Link to={isAuthenticated ? "/account" : "/signup"}>
              {isAuthenticated ? (
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-500 font-bold text-sm">
                    {user?.firstName?.[0] || user?.name?.[0] || "U"}
                  </span>
                </div>
              ) : (
                <CiUser className="text-3xl text-black cursor-pointer" />
              )}
            </Link>

            {/* Hamburger Menu */}
            <button onClick={() => setOpen((p) => !p)}>
              {open ? <IoClose className="text-3xl text-black" /> : <GiHamburgerMenu className="text-3xl text-black" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden 
            overflow-hidden border-t
            transition-all duration-300 
            ${open ? "max-h-96 opacity-100 translate-y-0 pt-4 pb-4" : "max-h-0 opacity-0 -translate-y-3"}
          `}
        >
          {/* Search Mobile */}
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
            <input type="search" className="bg-transparent outline-none text-sm w-full" placeholder="Search" />
          </label>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-2">
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1 hover:text-red-500"
              to={"/"}
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1 hover:text-red-500"
              to={"/contact"}
            >
              Contact
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-black text-base font-semibold py-1 hover:text-red-500"
              to={"/about"}
            >
              About
            </Link>
            
            {/* Agar login qilmagan bo'lsa SignUp va Login ko'rsatiladi */}
            {!isAuthenticated ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  className="text-black text-base font-semibold py-1 hover:text-red-500"
                  to={"/signup"}
                >
                  Sign Up
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="text-black text-base font-semibold py-1 hover:text-red-500"
                  to={"/login"}
                >
                  Login
                </Link>
              </>
            ) : (
              // Agar login qilgan bo'lsa Account ko'rsatiladi
              <Link
                onClick={() => setOpen(false)}
                className="text-black text-base font-semibold py-1 hover:text-red-500"
                to={"/account"}
              >
                My Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;