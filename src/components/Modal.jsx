

import React, { useState, useEffect } from "react";
import { getCoursesApi } from "../services/courseServices";
import { getAllLessonsApi } from "../services/lessonServices";

const Modal = ({ isOpen, onClose, data, mode = "view", type = "module", onSave }) => {
  if (!isOpen) return null;

  // Module state
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    lessons: [],
    order: 0,
  });

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  // User state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    courses: [],
  });

  // Fetch courses & lessons for module
  useEffect(() => {
    if (type === "module") {
      const fetchData = async () => {
        try {
          const coursesData = await getCoursesApi();
          const lessonsData = await getAllLessonsApi();

          setCourses(Array.isArray(coursesData.data.message) ? coursesData.data.message : []);
          setLessons(Array.isArray(lessonsData.data.message) ? lessonsData.data.message : []);
        } catch (err) {
          console.error("Error fetching courses or lessons:", err);
        }
      };
      fetchData();
    }
  }, [type]);

  // Set initial data
  useEffect(() => {
    if (!data) return;

    if (type === "module") {
      setFormData({
        title: data.title || "",
        course: data.course || "",
        lessons: data.lessons || [],
        order: data.order || 0,
      });
    } else if (type === "user") {
      setUserData({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "",
        courses: data.courses || [],
      });
    }
  }, [data, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLessonsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData({ ...formData, lessons: selectedOptions });
  };

  const handleSave = () => {
    if (type === "module") onSave && onSave(formData);
    else if (type === "user") onSave && onSave(userData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4">
          {type === "module"
            ? mode === "edit"
              ? "Edit Module"
              : "Module Details"
            : type === "user"
            ? mode === "edit"
              ? "Edit User"
              : "User Details"
            : ""}
        </h2>

        {/* Content */}
        {type === "module" ? (
          mode === "view" ? (
            <div className="space-y-2">
              <p><b>Title:</b> {formData.title}</p>
              <p>
                <b>Course:</b> {courses.find((c) => c._id === formData.course)?.title || "N/A"}
              </p>
              <p>
                <b>Lessons:</b>{" "}
                {formData.lessons.length
                  ? lessons
                      .filter((l) => formData.lessons.includes(l._id))
                      .map((l) => l.title)
                      .join(", ")
                  : "No Lessons"}
              </p>
              <p><b>Order:</b> {formData.order}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </div>
          )
        ) : type === "user" ? (
          <div className="space-y-2">
            <p><b>Name:</b> {userData.name}</p>
            <p><b>Email:</b> {userData.email}</p>
            <p><b>Role:</b> {userData.role}</p>
            <p>
              <b>Courses:</b>{" "}
              {userData.courses.length ? userData.courses.join(", ") : "No Courses"}
            </p>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
          {mode === "edit" && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
