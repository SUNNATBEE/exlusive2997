// src/pages/registers/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, clearError } from "../../redux/slice/SaginUpSlice";
import SignImg from "../../assets/img.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.saginAuth.loading);
  const error = useSelector((state) => state.saginAuth.error);
  const user = useSelector((state) => state.saginAuth.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    dispatch(clearError());
    setLoginAttempted(false);
  }, [dispatch]);

  // ✅ FAKAT user mavjud bo'lganda Home ga o'tish
  useEffect(() => {
    if (user && loginAttempted) {
      console.log("✅ Login successful! Navigating to home...");
      // Kechikish bilan Home sahifasiga o'tish
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate, loginAttempted]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginAttempted(true);
    
    // Formani tekshirish
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }
    
    console.log("Login attempt with:", formData);
    dispatch(login(formData));
  };

  // Login muvaffaqiyatli bo'lsa ko'rsatish
  const showSuccess = user && loginAttempted && !error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img src={SignImg} alt="Login" className="w-full max-w-lg object-contain" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Log in to Exclusive</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

          {/* ERROR MESSAGE */}
          {error && loginAttempted && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">❌ {error}</p>
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">✅ Login successful! Redirecting to home...</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setLoginAttempted(false); // Yangi kiritishda error'ni tozalash
                }}
                className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-red-500 text-black"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setLoginAttempted(false); // Yangi kiritishda error'ni tozalash
                }}
                className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-red-500 text-black"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg font-semibold disabled:bg-gray-400 transition duration-200"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <Link 
                to="/forgot-password" 
                className="text-red-500 hover:text-red-600 font-medium text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600 mb-2">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Sign Up
                </Link>
              </p>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-red-500 transition duration-200 mt-2 inline-block"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;