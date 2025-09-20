import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllLessonsApi } from "../services/lessonServices";

const AllLessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await getAllLessonsApi();
        if (mounted) setLessons(res.data || []);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch lessons");
        toast.error(err.message || "Failed to fetch lessons");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLessons();
    return () => (mounted = false);
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading lessons...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
      {lessons.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-lg">
          No lessons found.
        </p>
      ) : (
        lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                {lesson.title}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Module:</strong> {lesson.module || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {lesson.type}
              </p>
              {lesson.duration && (
                <p className="text-gray-600 mb-1">
                  <strong>Duration:</strong> {lesson.duration} mins
                </p>
              )}
              {lesson.order && (
                <p className="text-gray-600 mb-1">
                  <strong>Order:</strong> {lesson.order}
                </p>
              )}
            </div>

            {lesson.type === "video" && lesson.contentUrl && (
              <video
                src={lesson.contentUrl}
                controls
                className="w-full rounded-b-xl"
              />
            )}

            {lesson.type === "pdf" && lesson.contentUrl && (
              <a
                href={lesson.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-indigo-600 text-white font-semibold py-2 hover:bg-indigo-700 transition-colors"
              >
                View PDF
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllLessonsList;
