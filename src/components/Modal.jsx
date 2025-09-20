import React from "react";

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  let filteredData = {};

  // Agar user/instructor
  if (data.role === "user") {
    filteredData = {
      Name: data.name,
      Email: data.email,
      Role: data.role,
      Courses: data.courses?.length ? data.courses.join(", ") : "No courses",
      "Enrolled At": data.enrolledAt
        ? new Date(data.enrolledAt).toLocaleDateString()
        : "N/A",
    };
  } else if (data.role === "instructor") {
    filteredData = {
      Name: data.name,
      Email: data.email,
      Role: data.role,
    };
  } 
  // Agar module/course
  else if (data.title) {
    filteredData = {
      Title: data.title,
      Course: data.courseDetails?.title || "N/A",
      Description: data.description || "N/A",
      Order: data.order || "N/A",
      Duration: data.duration ? `${data.duration} mins` : "N/A",
      Type: data.type || "N/A",
    };
  } 
  // Default fallback
  else {
    filteredData = {
      Name: data.name || "N/A",
      Email: data.email || "N/A",
      Role: data.role || "N/A",
    };
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <div className="space-y-2">
          {Object.entries(filteredData).map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold capitalize">{key}:</span>{" "}
              {String(value)}
            </p>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
