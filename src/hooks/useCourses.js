import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setCourses,
  addCourse,
  updateCourseInList,
  removeCourse,
  setLoading,
  setError,
  clearCourses,
} from "../reducers/courseSlice";
import {
  createCourseApi,
  deleteCourseApi,
  getCoursesApi,
  updateCourseApi,
} from "../services/courseServices";

export function useCourses() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.courses);

  // Load all courses
  const loadCourses = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getCoursesApi();
      // console.log(res.data?.message);
      dispatch(setCourses(res.data?.message)); 
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to fetch courses!");
    }
  };

  // Create course
  const createCourse = async (payload) => {
    try {
      dispatch(setLoading(true));
      const res = await createCourseApi(payload);
      dispatch(addCourse(res.data.data));
      toast.success("Course created successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to create course!");
    }
  };

  // Update course
  const updateCourse = async (id, payload) => {
    try {
      const res = await updateCourseApi(id, payload);
      dispatch(updateCourseInList(res.data.data));
      toast.success("Course updated successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to update course!");
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await deleteCourseApi(id);
      dispatch(removeCourse(id));
      toast.success("Course deleted successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to delete course!");
    }
  };

  // Reset
  const resetCourses = () => dispatch(clearCourses());

  return {
    courses: list, 
    loading,
    error,
    loadCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    resetCourses,
  };
}
