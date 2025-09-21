
import { createSlice } from "@reduxjs/toolkit";


 const initialState = {
  list: [],
  loading: false,
  error: null,
};
const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    addModule(state, action) {
      state.list.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateModule(state, action) {
      const updatedModule = action.payload;
      state.list = state.list.map((m) =>
        m._id === updatedModule._id ? updatedModule : m
      );
      state.loading = false;
      state.error = null;
    },
    // ✅ Soft delete ke liye reducer
    softDeleteModule(state, action) {
      const deletedModule = action.payload;
      state.list = state.list.map((m) =>
        m._id === deletedModule._id ? deletedModule : m
      );
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearModules(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setModules,
  addModule,
  updateModule,
  softDeleteModule, 
  setLoading,
  setError,
  clearModules,
} = moduleSlice.actions;

export default moduleSlice.reducer;
