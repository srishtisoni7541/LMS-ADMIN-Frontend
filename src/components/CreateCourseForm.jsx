
import { useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { toast } from "react-toastify";
import { getAllInstructors } from "../services/instructorService";
import LoaderModal from "./LoaderModal";

const CourseForm = () => {
  const { createCourse, loading: courseLoading } = useCourses();
  const [instructors, setInstructors] = useState([]);
  const [instructorLoading, setInstructorLoading] = useState(false);
  const [instructorError, setInstructorError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    instructor: "",
    price: "",
    thumbnail: null, 
    category: "",
  });

  useEffect(() => {
    let mounted = true;
    const fetchInstructors = async () => {
      setInstructorLoading(true);
      try {
        const res = await getAllInstructors();
        // console.log("Instructors fetched:", res);
        if (mounted) setInstructors(Array.isArray(res.message) ? res.message : []);
      } catch (err) {
        console.error(err);
        setInstructorError("Failed to fetch instructors!");
        toast.error("Failed to fetch instructors!");
      } finally {
        if (mounted) setInstructorLoading(false);
      }
    };
    fetchInstructors();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setForm({ ...form, thumbnail: files[0] }); // store the file
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.instructor) {
      toast.error("Please select an instructor!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("instructor", form.instructor);
      formData.append("price", form.price);
      formData.append("category", form.category);
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      await createCourse(formData);
      toast.success("Course created successfully!");
      setForm({
        title: "",
        slug: "",
        description: "",
        instructor: "",
        price: "",
        thumbnail: null,
        category: "",
      });
    } catch (err) {
      toast.error("Failed to create course!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow rounded space-y-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Create Course</h2>

      {/* Show loading text at top */}
      {courseLoading && (
        <LoaderModal message="Creating..."/>
      )}

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Course Title"
        className="w-full border p-2 rounded"
        required
        disabled={courseLoading}
      />

      <input
        type="text"
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug (SEO-friendly)"
        className="w-full border p-2 rounded"
        required
        disabled={courseLoading}
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
        required
        disabled={courseLoading}
      />

      <select
        name="instructor"
        value={form.instructor}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
        disabled={courseLoading || instructorLoading}
      >
        <option value="">Select Instructor</option>
        {instructorLoading && <option disabled>Loading instructors...</option>}
        {instructors.map((inst) => (
          <option key={inst._id} value={inst._id}>
            {inst.name}
          </option>
        ))}
      </select>

      {instructorError && <p className="text-red-500 text-sm">{instructorError}</p>}

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2 rounded"
        disabled={courseLoading}
      />

      {/* Image Upload */}
      <input
        type="file"
        name="thumbnail"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        disabled={courseLoading}
      />

      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
        disabled={courseLoading}
      />

      <button
        type="submit"
        disabled={courseLoading || instructorLoading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {courseLoading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
        )}
        {courseLoading ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
};

export default CourseForm;
