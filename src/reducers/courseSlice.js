import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    addCourse(state, action) {
      state.list.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateCourseInList(state, action) {
      const index = state.list.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
    },
    removeCourse(state, action) {
      state.list = state.list.filter(c => c._id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearCourses(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCourses, addCourse, updateCourseInList, removeCourse, setLoading, setError, clearCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
