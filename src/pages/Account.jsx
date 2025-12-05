// src/pages/Account.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/SaginUpSlice';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaUndo, FaHeart } from 'react-icons/fa';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.saginAuth.user);
  
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Agar user login qilmagan bo'lsa, SaginUp sahifasiga yo'naltirish
    const savedUser = localStorage.getItem("user");
    
    if (!savedUser && !reduxUser) {
      console.log("No user found, redirecting to signup");
      navigate("/signup");
      return;
    }
    
    // User ma'lumotlarini o'rnatish
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setFormData({
          firstName: parsedUser.firstName || parsedUser.name?.split(' ')[0] || '',
          lastName: parsedUser.lastName || parsedUser.name?.split(' ')[1] || '',
          email: parsedUser.email || '',
          address: parsedUser.address || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/signup");
      }
    }
    
    if (reduxUser) {
      setUser(reduxUser);
      setFormData(prev => ({
        ...prev,
        firstName: reduxUser.firstName || reduxUser.name?.split(' ')[0] || '',
        lastName: reduxUser.lastName || reduxUser.name?.split(' ')[1] || '',
        email: reduxUser.email || '',
        address: reduxUser.address || ''
      }));
    }
  }, [reduxUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Parollar tekshirish
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    if (formData.newPassword && formData.newPassword.length < 6) {
      alert("New password must be at least 6 characters!");
      return;
    }
    
    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      name: `${formData.firstName} ${formData.lastName}`.trim()
    };
    
    // Agar yangi parol kiritilgan bo'lsa
    if (formData.newPassword) {
      updatedUser.password = formData.newPassword;
    }
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign up first</h2>
          <Link 
            to="/signup" 
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
          >
            Go to Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-red-500">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-semibold">My Account</span>
        </div>

        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome! <span className="text-red-500">{user.firstName || user.name} {user.lastName}</span>
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaUser className="mr-2 text-red-500" />
                Manage My Account
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 hover:text-red-500 cursor-pointer">
                  <div className="w-1 h-4 bg-red-500 mr-3"></div>
                  My Profile
                </li>
                <li className="flex items-center text-gray-700 hover:text-red-500 cursor-pointer">
                  <div className="w-1 h-4 bg-gray-200 mr-3"></div>
                  <FaMapMarkerAlt className="mr-2" />
                  Address Book
                </li>
                <li className="flex items-center text-gray-700 hover:text-red-500 cursor-pointer">
                  <div className="w-1 h-4 bg-gray-200 mr-3"></div>
                  <FaCreditCard className="mr-2" />
                  My Payment Options
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">My Orders</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 hover:text-red-500 cursor-pointer">
                  <div className="w-1 h-4 bg-gray-200 mr-3"></div>
                  <FaShoppingBag className="mr-2" />
                  My Orders
                </li>
                <li className="flex items-center text-gray-700 hover:text-red-500 cursor-pointer">
                  <div className="w-1 h-4 bg-gray-200 mr-3"></div>
                  <FaUndo className="mr-2" />
                  My Returns
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaHeart className="mr-2 text-red-500" />
                My WishList
              </h3>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
            >
              <FiLogOut /> Log Out
            </button>
          </div>

          {/* Right Content - Edit Profile */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Edit Your Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  <FiEdit /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-xl font-bold mb-6">Password Changes</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-red-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!isEditing}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-semibold disabled:bg-gray-400"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;