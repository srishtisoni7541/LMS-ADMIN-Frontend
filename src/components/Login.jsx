import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Trophy,
  Star,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  GraduationCap,
  Play,
  Award,
  Target,
  Zap,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "../reducers/authSlice";
import { toast } from "react-toastify";
import { forgotPasswordApi, loginApi } from "../services/authService";

const LoginPage = ({ setCurrentPage = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Forgot Password Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stats = [
    { number: "50K+", label: "Active Students", icon: Users },
    { number: "1000+", label: "Courses Available", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Trophy },
    { number: "4.9★", label: "Average Rating", icon: Star },
  ];

  const features = [
    { icon: Play, title: "Interactive Learning", desc: "Engaging video content with real-time feedback" },
    { icon: Award, title: "Certified Courses", desc: "Industry-recognized certificates upon completion" },
    { icon: Target, title: "Personalized Path", desc: "AI-powered learning recommendations" },
    { icon: Zap, title: "Fast Progress", desc: "Learn at your own pace with smart scheduling" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      const res = await loginApi({password,email});
      dispatch(setUser(res.data)); 
       dispatch(setCredentials  ({
      user: res.data.user,
      accessToken: res.data.accessToken,
    }));
     toast.success("Login successful! 🎉");
     navigate('/admin');
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials!");
    }
  };

  const clickHandler = () => {
    navigate("/register");
  };
const handleForgotSubmit = async () => {
  if (!forgotEmail) return;

  setIsLoading(true);

  try {
    // API call to trigger email
    await forgotPasswordApi({ email: forgotEmail });

    setIsLoading(false);
    setIsSubmitted(true);
    toast.success("Reset link sent to your email!");
    
    // Ab frontend ko token ko handle karne ki zarurat nahi, user email me click karega
  } catch (error) {
    setIsLoading(false);
    toast.error(error.response?.data?.message || "Failed to send reset link");
  }
};



  // Forgot Password Modal Functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setForgotEmail("");
    setIsSubmitted(false);
  };

  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen w-full px-30 mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-start p-12 space-y-8">
          {/* Brand */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">EduFlow</h1>
              <p className="text-gray-400">Learn. Grow. Excel.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 w-full max-w-3xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {React.createElement(stats[currentStat].icon, {
                  className: "h-12 w-12 text-indigo-400",
                })}
              </div>
              <div className="text-4xl font-bold text-white mb-2 transition-all duration-500">
                {stats[currentStat].number}
              </div>
              <div className="text-gray-400 transition-all duration-500">
                {stats[currentStat].label}
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              {stats.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStat ? "bg-indigo-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <feature.icon className="h-8 w-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your learning journey</p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  onClick={openModal}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="button"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
                onClick={loginHandler}
              >
                Sign In
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button onClick={clickHandler} className="text-indigo-600 font-semibold hover:underline">
                  Sign up
                </button>
              </p>
              <button
                onClick={() => setCurrentPage("home")}
                className="mt-4 text-sm text-gray-500 flex items-center justify-center space-x-1 mx-auto"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Back to home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl w-full max-w-md transform animate-in zoom-in-95 duration-200 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">
                {isSubmitted ? 'Check Your Email' : 'Forgot Password'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleForgotSubmit}
                      disabled={isLoading || !forgotEmail}
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Email Sent Successfully!
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    We've sent a password reset link to <strong>{forgotEmail}</strong>. 
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            
            {!isSubmitted && (
              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
                <p className="text-xs text-gray-500 text-center">
                  Remember your password?{' '}
                  <button 
                    onClick={closeModal}
                    className="text-indigo-500 hover:text-indigo-600 font-medium"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;