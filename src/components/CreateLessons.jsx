import { useState, useEffect } from "react";
import { useLesson } from "../hooks/useLesson";
import { toast } from "react-toastify";
import LoaderModal from "./LoaderModal"; 

const lessonTypes = ["video", "pdf"];

const CreateLessonForm = ({ modules }) => {
  const [title, setTitle] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [type, setType] = useState("video");
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [order, setOrder] = useState("");

  const { addLesson, loading, error, success, resetState } = useLesson();

  useEffect(() => {
    if (success) {
      toast.success("Lesson created successfully!");
      resetForm();
      resetState();
    }
    if (error) {
      toast.error(error);
      resetState();
    }
  }, [success, error]);

  const resetForm = () => {
    setTitle("");
    setModuleId("");
    setType("video");
    setFile(null);
    setDuration("");
    setOrder("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !moduleId || !type || !file) {
      toast.error("Please fill all required fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("module", moduleId);
    formData.append("type", type);
    formData.append("file", file);
    if (duration) formData.append("duration", duration);
    if (order) formData.append("order", order);

    addLesson(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md relative">
      {/* Loader Modal */}
      {loading && <LoaderModal message="Creating lesson..." />}

      <h2 className="text-xl font-bold mb-4">Create New Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Module *</label>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select module</option>
            {modules.map((mod) => (
              <option key={mod._id} value={mod._id}>
                {mod.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Type *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {lessonTypes.map((lt) => (
              <option key={lt} value={lt}>
                {lt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">File *</label>
          <input
            type="file"
            accept={type === "video" ? "video/*" : "application/pdf"}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Duration (mins)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
};

export default CreateLessonForm;
