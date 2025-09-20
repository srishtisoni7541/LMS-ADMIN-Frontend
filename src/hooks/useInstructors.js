import { useDispatch, useSelector } from "react-redux";
import {
  clearInstructors,
  setError,
  setInstructors,
  setLoading,
  updateInstructor,
  addInstructor,
} from "../reducers/instructorSlice";
import { getAllInstructors, removeInstructor } from "../services/instructorService";
import { makeInstructor as makeInstructorApi } from "../services/instructorService"; // missing import

export function useInstructors() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.instructors);

  // Fetch All Instructors
  const loadInstructors = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getAllInstructors();
      dispatch(setInstructors(Array.isArray(res.message) ? res.message : []));
    } catch (err) {
      dispatch(setError(err.message || "Failed to load instructors"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Promote User -> Instructor
  const promoteToInstructor = async (userId) => {
    try {
      dispatch(setLoading(true));
      const res = await makeInstructorApi(userId);
      const updatedUser = res.data;

      // List me update/add
      if (list.some((u) => u._id === updatedUser._id)) {
        dispatch(updateInstructor(updatedUser));
      } else {
        dispatch(addInstructor(updatedUser));
      }

      return updatedUser;
    } catch (err) {
      dispatch(setError(err.message || "Failed to promote"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Demote Instructor -> Student
  const demoteToStudent = async (userId) => {
    try {
      dispatch(setLoading(true));
      await removeInstructor(userId); // API call to remove instructor

      // Remove from instructors list in Redux
      const updatedList = list.filter((inst) => inst._id !== userId);
      dispatch(setInstructors(updatedList));

      return userId;
    } catch (err) {
      dispatch(setError(err.message || "Failed to demote"));
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
    demoteToStudent,
    resetInstructors,
  };
}
