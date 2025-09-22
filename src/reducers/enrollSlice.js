import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const cancelEnrollSlice = createSlice({
  name: "cancelEnroll",
  initialState,
  reducers: {
    setEnrollRequests: (state, action) => {
      state.requests = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearRequests: (state) => {
      state.requests = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setEnrollRequests, setLoading, setError, clearRequests } = cancelEnrollSlice.actions;
export default cancelEnrollSlice.reducer;
