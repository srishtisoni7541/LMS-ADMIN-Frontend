import { createSlice } from "@reduxjs/toolkit";

const ACCESS_KEY = "auth_access";
const USER_KEY = "auth_user";

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
  accessToken: localStorage.getItem(ACCESS_KEY) || null,
  isAuthenticated: !!localStorage.getItem(ACCESS_KEY),
  forgotPasswordEmail: null,
  resetPasswordStatus: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken } = action.payload;

      state.user = user ?? state.user;
      state.accessToken = accessToken ?? state.accessToken;
      state.isAuthenticated = !!state.accessToken;

      // localStorage update
      if (accessToken) {
        localStorage.setItem(ACCESS_KEY, accessToken);
      }
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    },

    setforgotPassword(state, action) {
      state.forgotPasswordEmail = action.payload; // email save
    },
     resetPassword(state, action) {
      state.resetPasswordStatus = action.payload.status;
    },

    clearCredentials(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(USER_KEY);
    },

    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials,setforgotPassword, clearCredentials, setUser } = authSlice.actions;
export default authSlice.reducer;
