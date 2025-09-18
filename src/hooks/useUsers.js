import { useDispatch, useSelector } from "react-redux";
import { fetchUsersApi } from "../services/userService";
import { setUsers, setLoading, setError, clearUsers } from "../reducers/userSlice";

export function useUsers() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.users);

  const loadUsers = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetchUsersApi();
      dispatch(setUsers(res.data)); 
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const resetUsers = () => dispatch(clearUsers());

  return {
    users: list,
    loading,
    error,
    loadUsers,
    resetUsers,
  };
}
