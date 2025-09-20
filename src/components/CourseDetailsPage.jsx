import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Clock,
  User,
  BookOpen,
  Star,
  CheckCircle,
  Download,
  ArrowLeft,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { getCourseByIdApi } from "../services/courseServices";

// Dropdown Menu Component
const DropdownMenu = ({ isOpen, onToggle, onEdit, onDelete, type, name }) => {
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-1 hover:bg-gray-200 rounded transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              onToggle();
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            <Edit className="w-3 h-3" />
            Edit {type}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              onToggle();
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600 border-t border-gray-100"
          >
            <Trash2 className="w-3 h-3" />
            Delete {type}
          </button>
        </div>
      )}
    </div>
  );
};

const CourseDetails = () => {
  const { id } = useParams();

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourseByIdApi(id);
        console.log(res);
        setCourse(res.data.message);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) loadCourse();
  }, [id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleEditModule = (module) => {
    console.log('Edit module:', module);
    // Add your edit module logic here
  };

  const handleDeleteModule = (module) => {
    if (window.confirm(`Are you sure you want to delete the module "${module.title}"?`)) {
      console.log('Delete module:', module);
      // Add your delete module logic here
    }
  };

  const handleEditLesson = (lesson) => {
    console.log('Edit lesson:', lesson);
    // Add your edit lesson logic here
  };

  const handleDeleteLesson = (lesson) => {
    if (window.confirm(`Are you sure you want to delete the lesson "${lesson.title}"?`)) {
      console.log('Delete lesson:', lesson);
      // Add your delete lesson logic here
    }
  };

  const getCompletedLessons = () => {
    if (!course?.modules) return 0;
    return course.modules.reduce(
      (total, module) =>
        total + module.lessons.filter((lesson) => lesson.isCompleted).length,
      0
    );
  };

  const getTotalLessons = () => {
    if (!course?.modules) return 0;
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load course: {error}
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Course not found
      </div>
    );

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-96 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center justify-start gap-2 mb-2">
            <ArrowLeft className="w-5 h-5 cursor-pointer hover:bg-white/20 rounded p-0.5" />
            <h2 className="text-lg font-bold leading-tight">{course.title}</h2>
          </div>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {course.instructor?.name}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>
                {getCompletedLessons()}/{getTotalLessons()} lessons
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (getCompletedLessons() / getTotalLessons()) * 100 || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="flex-1 overflow-y-auto">
          {course.modules.map((module, index) => (
            <div key={module._id} className="border-b border-gray-100">
              <div className="flex items-center">
                <button
                  onClick={() => toggleModule(module._id)}
                  className="flex-1 px-6 py-4 flex justify-between items-center hover:bg-gray-50 focus:outline-none transition-colors duration-200"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                        Module {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-800 mb-1">
                      {module.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        {module.lessons.length} lessons
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedModules.includes(module._id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {/* Module Dropdown */}
                <div className="pr-4">
                  <DropdownMenu
                    isOpen={openDropdown === `module-${module._id}`}
                    onToggle={() => toggleDropdown(`module-${module._id}`)}
                    onEdit={() => handleEditModule(module)}
                    onDelete={() => handleDeleteModule(module)}
                    type="Module"
                    name={module.title}
                  />
                </div>
              </div>

              {expandedModules.includes(module._id) && (
                <div className="bg-gray-50">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson._id} className="flex items-center">
                      <button
                        onClick={() => setSelectedLesson(lesson)}
                        className={`flex-1 text-left px-8 py-3 hover:bg-white transition-all duration-200 border-l-4 ${
                          selectedLesson?._id === lesson._id
                            ? "bg-white border-indigo-500 shadow-sm"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <span className="text-xs font-medium text-gray-400">
                                  Not yet
                                </span>
                              )}
                            </div>
                            <div>
                              <h4
                                className={`text-sm font-medium ${
                                  selectedLesson?._id === lesson._id
                                    ? "text-indigo-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {lessonIndex + 1}. {lesson.title}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {/* Lesson Dropdown */}
                      <div className="pr-4">
                        <DropdownMenu
                          isOpen={openDropdown === `lesson-${lesson._id}`}
                          onToggle={() => toggleDropdown(`lesson-${lesson._id}`)}
                          onEdit={() => handleEditLesson(lesson)}
                          onDelete={() => handleDeleteLesson(lesson)}
                          type="Lesson"
                          name={lesson.title}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {course.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {course.instructor?.name}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.level || "Beginner"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                ₹{course.price?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedLesson ? (
            <div className="space-y-6">
              <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={selectedLesson.contentUrl} // updated from videoUrl
                  className="w-full h-96 md:h-[500px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedLesson.title}
                ></iframe>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedLesson.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    {selectedLesson.isCompleted && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                    <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Resources
                    </button>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedLesson.content || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-8">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-96 h-56 object-cover rounded-xl shadow-lg mb-6"
                />
              </div>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to the Course!
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;