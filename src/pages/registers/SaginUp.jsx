// src/pages/registers/SaginUp.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { saginUp, clearError, clearSignupSuccess } from "../../redux/slice/SaginUpSlice";
import SignImg from "../../assets/img.png";

const SaginUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.saginAuth.loading);
  const error = useSelector((state) => state.saginAuth.error);
  const signupSuccess = useSelector((state) => state.saginAuth.signupSuccess);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // SignUp muvaffaqiyatli bo'lganda Login ga o'tadi
  useEffect(() => {
    if (signupSuccess) {
      console.log("✅ Signup successful! Redirecting to login...");
      // Kechikish bilan Login sahifasiga o'tish
      const timer = setTimeout(() => {
        dispatch(clearSignupSuccess()); // SignUp success ni tozalash
        navigate("/login");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [signupSuccess, navigate, dispatch]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Password match tekshirish
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    // Email formatini tekshirish
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }
    
    console.log("Signing up with:", formData);
    dispatch(saginUp(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img src={SignImg} alt="Sign up" className="w-full max-w-lg object-contain" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-sm text-gray-600 mb-2">Enter your details below</p>
          
          <p className="text-sm text-gray-500 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-600 font-medium">
              Log in
            </Link>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {signupSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">✅ Account created successfully! Redirecting to login...</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-red-500 text-black"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-red-500 text-black"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-red-500 text-black"
                required
                minLength={6}
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 focus:border-red-500 text-black"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 transition duration-200"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-red-500 transition duration-200"
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

export default SaginUp;