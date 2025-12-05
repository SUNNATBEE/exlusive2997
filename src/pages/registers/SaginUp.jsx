// src/pages/registers/SaginUp.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ❗ TO‘G‘RILANGAN IMPORT YO‘LI
import { saginUp, clearError } from "../../redux/slice/SaginUpSlice";

import SignImg from "../../assets/img.png";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.saginAuth.loading);
  const error = useSelector((state) => state.saginAuth.error);
  const user = useSelector((state) => state.saginAuth.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Session bor bo‘lsa Home ga o'tkazadi
  useEffect(() => {
    const checkSession = () => {
      const sessionUser = sessionStorage.getItem("currentUser");
      if (sessionUser) {
        navigate("/home");
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 100);
    return () => clearInterval(interval);
  }, [navigate]);

  // Yangi user yaratilsa home ga o‘tadi
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saginUp(formData));
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to Home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">

        <div className="flex items-center justify-center">
          <img src={SignImg} alt="Sign up" className="w-full max-w-lg object-contain" />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-sm text-gray-600 mb-8">Enter your details below</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-blue-500 text-black"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-blue-500 text-black"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-blue-500 text-black"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-blue-500 text-black"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
