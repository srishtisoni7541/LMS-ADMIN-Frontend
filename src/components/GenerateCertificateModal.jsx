
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { issueCertificateApi } from "../services/certificateService";

const GenerateCertificateModal = ({ user, onClose, onCertificateIssued }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(
    user.enrolledCoursesDetails?.[0]?._id || ""
  );
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedCourseId) {
      toast.error("Please select a course");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        student: user._id,     // ObjectId of student
        course: selectedCourseId,  // ObjectId of selected course
      };

      const res = await issueCertificateApi(payload);
      const certificate = res.data.data;

      // Notify parent
      if (onCertificateIssued) {
        onCertificateIssued(certificate);
      }

      toast.success("Certificate generated successfully!");
      onClose(); // close modal after success
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate certificate!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-lg font-bold mb-4">Generate Certificate</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Course</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            {user.enrolledCoursesDetails.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Certificate"}
        </button>
      </div>
    </div>
  );
};

export default GenerateCertificateModal;
