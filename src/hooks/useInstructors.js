import { useDispatch, useSelector } from "react-redux";
import {
  clearInstructors,
  setError,
  setInstructors,
  setLoading,
  updateInstructor,
  addInstructor,
} from "../reducers/instructorSlice";
import { getAllInstructors } from "../services/instructorService";

export function useInstructors() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.instructors);

  // Fetch All Instructors
  const loadInstructors = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getAllInstructors();
      dispatch(setInstructors(res.data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  // Promote User -> Instructor
  const promoteToInstructor = async (userId) => {
    try {
      dispatch(setLoading(true));
      const res = await makeInstructorApi(userId); 
      const updatedUser = res.data;

      // Agar response instructor hai to list me push/update
      if (list.some((u) => u._id === updatedUser._id)) {
        dispatch(updateInstructor(updatedUser));
      } else {
        dispatch(addInstructor(updatedUser));
      }
      return updatedUser;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resetInstructors = () => dispatch(clearInstructors());

  return {
    instructors: list,
    loading,
    error,
    loadInstructors,
    promoteToInstructor,
    resetInstructors,
  };
}
