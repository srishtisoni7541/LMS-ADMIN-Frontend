// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useModules } from "../hooks/useModule";
// import { getCoursesApi } from "../services/courseServices"; 

// const CreateModuleForm = () => {
//   const { createModule } = useModules();
//   const [title, setTitle] = useState("");
//   const [course, setCourse] = useState("");
//   const [order, setOrder] = useState(0);
//   const [courses, setCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(false);

//   // Fetch courses for dropdown
//   useEffect(() => {
//     let mounted = true;
//     const fetchCourses = async () => {
//       setLoadingCourses(true);
//       try {
//         const res = await getCoursesApi();
//         console.log(res);
//         if (mounted) setCourses(Array.isArray(res.data.message) ? res.data.message : []);
//       } catch (err) {
//         toast.error("Failed to fetch courses!");
//         console.error(err);
//       } finally {
//         if (mounted) setLoadingCourses(false);
//       }
//     };
//     fetchCourses();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!course) {
//       toast.error("Please select a course!");
//       return;
//     }
//     try {
//       await createModule({ title, course, order });
//       toast.success("Module created successfully!");
//       setTitle("");
//       setCourse("");
//       setOrder(0);
//     } catch (err) {
//       toast.error("Failed to create module!");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
//     >
//       <h2 className="text-2xl font-bold text-indigo-600 mb-4">Create Module</h2>

//       {/* Title */}
//       <div>
//         <label className="block text-gray-700">Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
//           required
//         />
//       </div>

//       {/* Course Dropdown */}
//       <div>
//         <label className="block text-gray-700">Select Course</label>
//         <select
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//           className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
//           required
//         >
//           <option value="">-- Select a Course --</option>
//           {loadingCourses && <option disabled>Loading courses...</option>}
//           {courses.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Order */}
//       <div>
//         <label className="block text-gray-700">Order</label>
//         <input
//           type="number"
//           value={order}
//           onChange={(e) => setOrder(e.target.value)}
//           className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//       >
//         Create Module
//       </button>
//     </form>
//   );
// };

// export default CreateModuleForm;



import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useModules } from "../hooks/useModule";
import { getCoursesApi } from "../services/courseServices"; 
import LoaderModal from "./LoaderModal"; // 👈 import loader

const CreateModuleForm = () => {
  const { createModule } = useModules();
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [order, setOrder] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch courses for dropdown
  useEffect(() => {
    let mounted = true;
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const res = await getCoursesApi();
        if (mounted) setCourses(Array.isArray(res.data.message) ? res.data.message : []);
      } catch (err) {
        toast.error("Failed to fetch courses!");
      } finally {
        if (mounted) setLoadingCourses(false);
      }
    };
    fetchCourses();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course) {
      toast.error("Please select a course!");
      return;
    }
    setSubmitting(true); // 👈 show loader
    try {
      await createModule({ title, course, order });
      toast.success("Module created successfully!");
      setTitle("");
      setCourse("");
      setOrder(0);
    } catch (err) {
      toast.error("Failed to create module!");
    } finally {
      setSubmitting(false); // 👈 hide loader
    }
  };

  return (
    <>
      {/* Loader Modal - Show only when submitting */}
      {submitting && <LoaderModal message="Creating Module..." />}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Create Module</h2>

        {/* Title */}
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Course Dropdown */}
        <div>
          <label className="block text-gray-700">Select Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">-- Select a Course --</option>
            {loadingCourses && <option disabled>Loading courses...</option>}
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="block text-gray-700">Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Create Module
        </button>
      </form>
    </>
  );
};

export default CreateModuleForm;
