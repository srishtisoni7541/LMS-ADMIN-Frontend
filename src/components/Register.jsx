import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  User,
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setCurrentPage = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const benefits = [
    {
      icon: BookOpen,
      title: "Unlimited Access",
      desc: "Access to all courses and learning materials",
    },
    {
      icon: Trophy,
      title: "Earn Certificates",
      desc: "Get industry-recognized certificates",
    },
    {
      icon: Users,
      title: "Join Community",
      desc: "Connect with learners worldwide",
    },
    {
      icon: Shield,
      title: "Secure Learning",
      desc: "Your data and progress are protected",
    },
  ];

  const features = [
    "Access to 1000+ premium courses",
    "Personalized learning paths",
    "24/7 expert support",
    "Mobile & offline learning",
    "Progress tracking & analytics",
    "Industry certifications",
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      text: "EduFlow transformed my career completely!",
    },
    {
      name: "Raj Patel",
      role: "Data Scientist",
      text: "Best learning platform I've ever used.",
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      text: "The courses are practical and well-structured.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { register } = useAuth();

  async function handleRegister() {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsRegisterLoading(true);

    try {
      const data = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("🎉 Registered successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Registration failed!");
    } finally {
      setIsRegisterLoading(false);
    }
  }

  // async function handleRegister() {
  //   if (form.password !== form.confirmPassword) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     const data = await register({
  //       name: form.name,
  //       email: form.email,
  //       password: form.password,
  //     });

  //     toast.success("🎉 Registered successfully!");
  //     setTimeout(() => navigate("/login"), 2000);
  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //     toast.error(" Registration failed!");
  //   }
  // }

  return (
    <div className="min-h-screen w-full px-30 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Benefits & Features */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-start p-12 space-y-8">
          {/* Brand Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">EduFlow</h1>
              <p className="text-gray-400">Join thousands of learners</p>
            </div>
          </div>

          {/* Animated Benefits */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 w-full max-w-3xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {React.createElement(benefits[currentBenefit].icon, {
                  className: "h-12 w-12 text-purple-400",
                })}
              </div>
              <div className="text-xl font-bold text-white mb-2 transition-all duration-500">
                {benefits[currentBenefit].title}
              </div>
              <div className="text-gray-400 transition-all duration-500">
                {benefits[currentBenefit].desc}
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              {benefits.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentBenefit ? "bg-purple-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 w-full max-w-3xl">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
              What you'll get:
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 w-full max-w-3xl">
            <div className="text-center">
              <div className="text-gray-300 italic mb-4 transition-all duration-500">
                "{testimonials[currentTestimonial].text}"
              </div>
              <div className="text-white font-semibold transition-all duration-500">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-gray-400 text-sm transition-all duration-500">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
            <div className="flex justify-center space-x-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="flex-1  flex items-center justify-center p-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
                <GraduationCap className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  EduFlow
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Start your learning adventure today
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Takes less than 2 minutes</span>
              </div>
            </div>

            {/* Register Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters with numbers and symbols
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-500 transition-colors underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-500 transition-colors underline"
                  >
                    Privacy Policy
                  </button>
                </span>
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2"
                onClick={handleRegister}
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>

              {/* <button
                type="button"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                onClick={handleRegister}
              >
                <span className="relative z-10">Create Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button> */}
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-sm text-gray-500">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="group-hover:text-gray-900 transition-colors">
                  Sign up with Google
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-purple-600 hover:text-purple-500 font-semibold transition-colors hover:underline"
                >
                  Sign in
                </button>
              </p>
              <button
                onClick={() => setCurrentPage("home")}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-1 mx-auto group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
