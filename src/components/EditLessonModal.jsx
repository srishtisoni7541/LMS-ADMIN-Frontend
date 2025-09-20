import React, { useState, useEffect } from "react";

const EditLessonModal = ({ isOpen, onClose, lesson, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "video",
    contentUrl: "",
    order: 0,
    duration: 0,
    file: null,
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || "",
        type: lesson.type || "video",
        contentUrl: lesson.contentUrl || "",
        order: lesson.order || 0,
        duration: lesson.duration || 0,
        file: null,
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = () => {
    onSave(formData); // pass updated data including file
    onClose();
  };

  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Lesson</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Video / PDF</label>
            <input
              type="file"
              accept={formData.type === "video" ? "video/*" : ".pdf"}
              onChange={handleFileChange}
              className="border rounded px-2 py-1 w-full"
            />
            {formData.contentUrl && !formData.file && (
              <p className="text-sm text-gray-500 mt-1">
                Current file: <a href={formData.contentUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLessonModal;
