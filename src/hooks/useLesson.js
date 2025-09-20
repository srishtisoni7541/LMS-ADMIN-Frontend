import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  startLoading,
  lessonCreated,
  lessonError,
  resetLessonState,
  setLessons,
} from "../reducers/lessonSlice";
import { createLessonApi } from "../services/lessonServices";

export function useLesson() {
  const dispatch = useDispatch();
  const { lessons, loading, error, success } = useSelector((s) => s.lessons);

  // Create a new lesson
  const addLesson = async (formData) => {
    dispatch(startLoading()); // plain object
    try {
      const res = await createLessonApi(formData); // API call here
      dispatch(lessonCreated(res.data)); // plain object action
      toast.success("Lesson created successfully!");
    } catch (err) {
      dispatch(lessonError(err.message || "Failed to create lesson")); // plain object action
      toast.error(err.message || "Failed to create lesson");
    }
  };


   // 🔹 Update lesson
  const updateLesson = async (lessonId, data) => {
    dispatch(startLoading());
    try {
      const res = await updateLessonApi(lessonId, data);
      // replace old lesson in state
      dispatch(
        setLessons(
          lessons.map((l) => (l._id === lessonId ? res.data : l))
        )
      );
      toast.success("Lesson updated successfully!");
      return true;
    } catch (err) {
      dispatch(lessonError(err.message || "Failed to update lesson"));
      toast.error(err.message || "Failed to update lesson");
      return false;
    }
  };

  const resetState = () => dispatch(resetLessonState()); 

  return {
    lessons,
    loading,
    error,
    success,
    addLesson,
    resetState,
    updateLesson
  };
}
