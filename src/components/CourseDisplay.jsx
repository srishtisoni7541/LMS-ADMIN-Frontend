import { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteCourseApi,
  getCoursesApi,
  updateCourseApi,
} from "../services/courseServices";
import EditCourseModal from "./EditCourseForm";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, courseTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-800">
            Confirm Delete
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">"{courseTitle}"</span>? <br />
          This action will mark the course as deleted.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const CoursesDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingCourse, setEditingCourse] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "all",
    "Programming",
    "Backend",
    "Frontend",
    "Design",
    "Data Science",
    "Mobile",
    "Marketing",
  ];

  // ✅ Fetch Courses
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCoursesApi();
      console.log(res);
      const fetchedCourses = res.data?.message?.map((course) => ({
        _id: course._id,
        title: course.title || "Untitled Course",
        description: course.description || "No description available",
        image:
          course.thumbnail ||
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
        instructor:
          course.instructor?.name ||
          course.instructor?.email ||
          "Unknown Instructor",
        category: course.category || "General",
        price: course.price || 0,
        duration: course.duration || "N/A",
        students: course.students || 0,
        rating: course.rating || 0,
        level: course.level || "Beginner",
        createdAt: course.createdAt || new Date().toISOString(),
        isDeleted: course.isDeleted || false,
      }));
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ✅ Search + Filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ✅ Edit
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsEditModalOpen(true);
  };

  const handleSaveCourse = async (updatedCourse) => {
    try {
      await updateCourseApi(updatedCourse._id, updatedCourse);
      setCourses((prev) =>
        prev.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
      );
      toast.success("Course updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating course:", err);
      toast.error("Failed to update course!");
    }
  };

  // ✅ Delete
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    try {
      await deleteCourseApi(courseToDelete._id);
      setCourses((prev) =>
        prev.map((c) =>
          c._id === courseToDelete._id ? { ...c, isDeleted: true } : c
        )
      );
      toast.success("Course deleted successfully!");
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course!");
    } finally {
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/course/${id}`, { state: { id } });
  };

  // ✅ Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
          <p className="text-gray-600">Manage and view all available courses</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BookOpen className="w-4 h-4" />
          <span>{filteredCourses.length} courses found</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search courses, instructors..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>

      {/* Edit Modal */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        course={editingCourse}
        onSave={handleSaveCourse}
      />

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        courseTitle={courseToDelete?.title}
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isDeleted = course.isDeleted;

          return (
            <div
              key={course._id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                isDeleted
                  ? "opacity-40 blur-[1px] pointer-events-none"
                  : "hover:shadow-xl"
              }`}
            >
              {/* Overlay for deleted course */}
              {isDeleted && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    DELETED
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isDeleted ? "scale-100" : "hover:scale-105"
                  }`}
                />
                {!isDeleted && (
                  <>
                    <span
                      className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold ${
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.level}
                    </span>
                    <span className="absolute top-4 right-4 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {course.category}
                    </span>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className={`text-lg font-bold mb-2 line-clamp-1 ${
                    isDeleted ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {course.title}
                </h3>
                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    isDeleted ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {course.description}
                </p>

                {!isDeleted && (
                  <>
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {course.students} students
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">
                        by {course.instructor}
                      </span>
                      <span className="text-xl font-bold text-indigo-600">
                        ₹{course.price.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {!isDeleted ? (
                    <>
                      <button
                        onClick={() => handleViewDetails(course._id)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(course)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 bg-gray-400 text-white px-3 py-2 rounded-lg text-sm font-medium text-center">
                      Course Deleted
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesDisplay;
