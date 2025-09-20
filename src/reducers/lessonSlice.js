import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lessons: [],
  loading: false,
  error: null,
  success: false,
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    lessonCreated: (state, action) => {
      state.loading = false;
      state.success = true;
      state.lessons.push(action.payload);
    },
    lessonError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetLessonState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
  },
});

export const {
  startLoading,
  lessonCreated,
  lessonError,
  resetLessonState,
  setLessons,
} = lessonSlice.actions;

export default lessonSlice.reducer;
