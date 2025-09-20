
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccountApi,
  editProfileApi,
  loginApi,
  logoutApi,
  registerApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../services/authService";
import {
  clearCredentials,
  setCredentials,
  setforgotPassword,
} from "../reducers/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);

  const login = async ({ email, password }) => {
    const data = await loginApi({ email, password });
    dispatch(setCredentials(data));
    return data;
  };

  const register = async (payload) => {
    const data = await registerApi(payload);
    dispatch(setCredentials(data));
    return data;
  };

  const editProfile = async (payload) => {
    const data = await editProfileApi(payload);
    dispatch(setCredentials({ ...auth, user: data.user })); // sirf user update
    return data.user;
  };

  const deleteAccount = async () => {
    const res = await deleteAccountApi();
    dispatch(clearCredentials());
    return res.message;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn("Logout API failed, but clearing local data");
    }
    dispatch(clearCredentials());
  };

  //  Forgot Password
  const forgotPassword = async (email) => {
    const res = await forgotPasswordApi({ email });
    dispatch(setforgotPassword(email)); // email redux me save
    return res.message;
  };

   const resetPassword = async ({ token, newPassword }) => {
    const res = await resetPasswordApi({ token, newPassword });
    return res.message; // e.g. "Password reset successful"
  };

  return {
    user: auth.user,
    accessToken: auth.accessToken,
    isAuthenticated: auth.isAuthenticated,
    forgotPasswordEmail: auth.forgotPasswordEmail,
    resetPasswordStatus: auth.resetPasswordStatus,
    login,
    register,
    logout,
    editProfile,
    deleteAccount,
    forgotPassword,
    resetPassword,
  };
}
