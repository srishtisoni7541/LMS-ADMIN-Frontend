import { ArrowRight, BookOpen, GraduationCap, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); 
  };
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduFlow
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLoginClick}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full  mx-auto px-10 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Learn Without
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Limits
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your learning journey with our cutting-edge LMS platform.
            Access world-class courses, connect with expert instructors, and
            unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleLoginClick()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Interactive Courses
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Engage with multimedia content, quizzes, and hands-on projects
              designed by industry experts.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Community Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with peers, join study groups, and learn collaboratively
              in our vibrant community.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Certified Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Earn industry-recognized certificates and badges to showcase your
              achievements.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-indigo-100">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-100">Expert Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-indigo-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Landingpage;