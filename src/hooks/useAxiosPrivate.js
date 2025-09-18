import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupInterceptors } from "../api/axios";
import { refreshTokens, tokenService } from "../services/authService";
import { setCredentials, clearCredentials } from "../store/authSlice";

/**
 * useAxiosPrivate returns an axios instance configured with interceptors,
 * wired to redux for token read/update and logout on refresh failure.
 *
 * It memoizes the setup so interceptors aren't added repeatedly.
 */
export function useAxiosPrivate() {
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth.accessToken);
  const refreshToken = useSelector((s) => s.auth.refreshToken);

  const instance = useMemo(() => {
    const axiosInst = setupInterceptors({
      getAccessToken: () => tokenService.getAccessToken(), // or () => accessToken
      // refresh function: call refreshTokens() which uses axiosRefresh (no interceptors)
      refreshTokenFn: async () => {
        const data = await refreshTokens(); // will throw if refresh invalid
        // data: { accessToken, refreshToken, user? }
        // update storage + redux
        dispatch(setCredentials(data));
        return data;
      },
      onRefreshFail: () => {
        // called when refresh fails -> clear credentials
        dispatch(clearCredentials());
      },
    });

    return axiosInst;
  }, [dispatch]);

  return instance;
}
