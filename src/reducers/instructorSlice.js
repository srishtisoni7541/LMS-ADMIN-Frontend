import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const instructorSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    setInstructors(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateInstructor(state, action) {
      const updated = action.payload;
      state.list = state.list.map((inst) =>
        inst._id === updated._id ? updated : inst
      );
    },
    addInstructor(state, action) {
      state.list.push(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearInstructors(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  setInstructors, 
  updateInstructor, 
  addInstructor, 
  setLoading, 
  setError, 
  clearInstructors 
} = instructorSlice.actions;

export default instructorSlice.reducer;
