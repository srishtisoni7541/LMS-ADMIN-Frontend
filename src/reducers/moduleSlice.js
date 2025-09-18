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

export const { setModules, addModule, setLoading, setError, clearModules } =
  moduleSlice.actions;
export default moduleSlice.reducer;
