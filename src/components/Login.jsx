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
  const [isLoginLoading, setIsLoginLoading] = useState(false);

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
    {
      icon: Play,
      title: "Interactive Learning",
      desc: "Engaging video content with real-time feedback",
    },
    {
      icon: Award,
      title: "Certified Courses",
      desc: "Industry-recognized certificates upon completion",
    },
    {
      icon: Target,
      title: "Personalized Path",
      desc: "AI-powered learning recommendations",
    },
    {
      icon: Zap,
      title: "Fast Progress",
      desc: "Learn at your own pace with smart scheduling",
    },
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
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoginLoading(true);

    try {
      const res = await loginApi({ password, email });
      dispatch(setUser(res.data));
      dispatch(
        setCredentials({
          user: res.data.user,
          accessToken: res.data.accessToken,
        })
      );

      toast.success("Login successful! 🎉");
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Invalid credentials!");
    } finally {
      setIsLoginLoading(false);
    }
  };

  // const loginHandler = async () => {
  //   try {
  //     const res = await loginApi({ password, email });
  //     dispatch(setUser(res.data));
  //     dispatch(
  //       setCredentials({
  //         user: res.data.user,
  //         accessToken: res.data.accessToken,
  //       })
  //     );
  //     toast.success("Login successful! 🎉");
  //     navigate("/admin");
  //   } catch (error) {
  //     console.error("Login failed:", error.response?.data || error.message);
  //     alert("Invalid credentials!");
  //   }
  // };

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
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-30 mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-start p-6 lg:p-12 space-y-8">
          {/* Brand */}
          <div className="flex items-center space-x-3 mb-6 lg:mb-8">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                EduFlow
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Learn. Grow. Excel.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 w-full max-w-3xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                {React.createElement(stats[currentStat].icon, {
                  className: "h-10 w-10 sm:h-12 sm:w-12 text-indigo-400",
                })}
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 transition-all duration-500">
                {stats[currentStat].number}
              </div>
              <div className="text-gray-400 text-sm sm:text-base transition-all duration-500">
                {stats[currentStat].label}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400 mb-2 sm:mb-3" />
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-white/20">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Sign in to continue your learning journey
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  onClick={openModal}
                  className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                onClick={loginHandler}
                disabled={isLoginLoading}
              >
                {isLoginLoading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Don't have an account?{" "}
                <button
                  onClick={clickHandler}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => setCurrentPage("home")}
                className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 flex items-center justify-center space-x-1 mx-auto"
              >
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
                <span>Back to home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
