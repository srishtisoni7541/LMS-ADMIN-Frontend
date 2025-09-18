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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "../reducers/authSlice";
import { toast } from "react-toastify";
import { loginApi } from "../services/authService";
const LoginPage = ({ setCurrentPage = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      // console.log("Login successful:", res.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials!");
    }
  };

  const clickHandler = () => {
    navigate("/register");
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
                    onChange={(e) => setEmail(e.target.value)} // ✅
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
                    onChange={(e) => setPassword(e.target.value)} // ✅
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
    </div>
  );
};

export default LoginPage;
