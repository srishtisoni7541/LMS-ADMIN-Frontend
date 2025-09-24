import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
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
import EditLessonModal from "./EditLessonModal";
import { deleteLessonApi, updateLessonApi } from "../services/lessonServices";
import { toast } from "react-toastify";

const DropdownMenu = ({ isOpen, onToggle, onEdit, onDelete, type }) => (
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

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editLesson, setEditLesson] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourseByIdApi(id);
        setCourse(res.data.message);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (id) loadCourse();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleDropdown = (id) =>
    setOpenDropdown(openDropdown === id ? null : id);

  const handleEditLesson = (lesson) => setEditLesson(lesson);

  const handleSaveLesson = async (updatedData) => {
    if (!editLesson) return;

    try {
      await updateLessonApi(editLesson._id, updatedData);

      toast.success("Lesson updated successfully!", { position: "top-right" });

      setEditLesson(null);

      const res = await getCourseByIdApi(id);
      const freshCourse = res.data.message;

      setCourse(freshCourse);

      setSelectedLesson((prev) =>
        prev?._id === editLesson._id ? { ...prev, ...updatedData } : prev
      );
    } catch (err) {
      console.error("Failed to update lesson:", err);
      toast.error("Failed to update lesson. Try again!", {
        position: "top-right",
      });
    }
  };

const handleDeleteLesson = async (lesson) => {
  if (!window.confirm(`Delete lesson "${lesson.title}"?`)) return;

  try {
    // Backend call for deletion
    await deleteLessonApi(lesson._id);

    toast.success("Lesson deleted successfully!", { position: "top-right" });

    // Directly update frontend state WITHOUT fetching course again
    setCourse((prevCourse) => {
      return {
        ...prevCourse,
        modules: prevCourse.modules.map((mod) => {
          if (mod._id !== lesson.moduleId) return mod;
          return {
            ...mod,
            lessons: mod.lessons.filter((l) => l._id !== lesson._id),
          };
        }),
      };
    });

    // Agar deleted lesson select tha to null kar do
    if (selectedLesson?._id === lesson._id) {
      setSelectedLesson(null);
    }

    // Optional: agar module khali ho gaya to module collapse bhi kar do
    setExpandedModules((prev) =>
      prev.filter((modId) => {
        const mod = course.modules.find((m) => m._id === modId);
        return mod?.lessons.some((l) => l._id !== lesson._id);
      })
    );
  } catch (err) {
    console.error("Failed to delete lesson:", err);
    toast.error("Failed to delete lesson. Try again!", {
      position: "top-right",
    });
  }
};

  const getCompletedLessons = () =>
    course?.modules?.reduce(
      (total, module) =>
        total + module.lessons.filter((l) => l.isCompleted).length,
      0
    ) || 0;

  const getTotalLessons = () =>
    course?.modules?.reduce(
      (total, module) => total + module.lessons.length,
      0
    ) || 0;

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
            <div>
              <ArrowLeft className="w-5 h-5 cursor-pointer hover:bg-white/20 rounded p-0.5" />
            </div>
            <h2 className="text-lg font-bold leading-tight">{course.title}</h2>
          </div>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {course.instructor?.name}
            </span>
          </div>
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
            <div
              key={module._id}
              className={`border-b border-gray-100 ${
                module.deleted ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleModule(module._id)}
                  className="flex-1 px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                        Module {index + 1}
                      </span>

                      {module.deleted && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                          Deleted
                        </span>
                      )}
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
                  <div>
                    {expandedModules.includes(module._id) ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </div>
                </button>

                <DropdownMenu
                  isOpen={openDropdown === `module-${module._id}`}
                  onToggle={() => toggleDropdown(`module-${module._id}`)}
                  onEdit={() => console.log("Edit module")}
                  onDelete={() => console.log("Delete module")}
                  type="Module"
                />
              </div>

              {/* Lessons */}
              {expandedModules.includes(module._id) &&
                module.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson._id} className="flex items-center">
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className={`flex-1 text-left px-8 py-3 hover:bg-white border-l-4 ${
                        selectedLesson?._id === lesson._id
                          ? "bg-white border-indigo-500"
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Video Preview */}
                        {lesson.contentUrl && (
                          <div className="w-12 h-8 bg-gray-200 border border-gray-300 rounded overflow-hidden flex-shrink-0">
                            <video
                              src={lesson.contentUrl}
                              className="w-full h-full object-cover"
                              muted
                              preload="metadata"
                            />
                          </div>
                        )}
                        
                        {lesson.isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                        <h4 className="text-sm font-medium">
                          {lessonIndex + 1}. {lesson.title}
                        </h4>
                      </div>
                    </button>

                    <DropdownMenu
                      isOpen={openDropdown === `lesson-${lesson._id}`}
                      onToggle={() => toggleDropdown(`lesson-${lesson._id}`)}
                      onEdit={() => handleEditLesson(lesson)}
                      onDelete={() => handleDeleteLesson(lesson)}
                      type="Lesson"
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        {selectedLesson ? (
          <div className="space-y-6">
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              {selectedLesson ? (
                <div className="space-y-6">
                  <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                    <video
                      src={selectedLesson.contentUrl}
                      controls
                      className="w-full h-96 md:h-[500px] object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
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
                  <h2 className="text-2xl font-bold mb-4">
                    Welcome to the Course!
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {course.description}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
                <div className="flex items-center gap-2">
                  {selectedLesson.isCompleted && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  )}
                  <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Resources
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-lg">
                {selectedLesson.content || "No description available."}
              </p>
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
            <h2 className="text-2xl font-bold mb-4">Welcome to the Course!</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {course.description}
            </p>
          </div>
        )}
      </div>

      {/* Edit Lesson Modal */}
      <EditLessonModal
        isOpen={!!editLesson}
        lesson={editLesson}
        onClose={() => setEditLesson(null)}
        onSave={handleSaveLesson}
      />
    </div>
  );
};

export default CourseDetails;