import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setModules,
  addModule,
  setLoading,
  setError,
  clearModules,
} from "../reducers/moduleSlice";
import { createModuleApi, getModulesApi } from "../services/moduleService";

export function useModules() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.modules);

  // Load all modules
  const loadModules = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getModulesApi();
      dispatch(setModules(res.data)); // API ka structure check karna
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to fetch modules!");
    }
  };

  // Create a new module
  const createModule = async (payload) => {
    try {
      dispatch(setLoading(true));
      const res = await createModuleApi(payload);
      dispatch(addModule(res.data));
      toast.success("Module created successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to create module!");
    }
  };


  const updateModuleAction = async (id, payload) => {
  try {
    dispatch(setLoading(true));
    const res = await updateModuleApi(id, payload);
    dispatch(updateModule(res.data));
    toast.success("Module updated successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to update module!");
  }
};

 const softDeleteAction = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await deleteModuleApi(id);
      dispatch(softDeleteModule(res.data)); // update state with soft deleted module
      toast.success("Module deleted successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to delete module!");
    }
  };

  // Reset state
  const resetModules = () => dispatch(clearModules());

  return {
    modules: list,
    loading,
    error,
    loadModules,
    createModule,
    resetModules,
    updateModuleAction,
    softDeleteAction,
  };
}
