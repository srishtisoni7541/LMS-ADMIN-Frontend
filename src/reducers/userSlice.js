import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.list = action.payload;
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
    clearUsers(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUsers, setLoading, setError, clearUsers } = userSlice.actions;
export default userSlice.reducer;
