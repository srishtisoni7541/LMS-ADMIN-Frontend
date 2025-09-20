import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/reducers/authSlice";
import userReducer from '../../src/reducers/userSlice';
import instructorReducer from '../../src/reducers/instructorSlice';
import moduleReducer from '../../src/reducers/moduleSlice';
import courseReducer from '../../src/reducers/userSlice';
import lessonReducer from  '../../src/reducers/lessonSlice';


 const store = configureStore({
  reducer: {
    auth: authReducer,
    users:userReducer,
    instructors:instructorReducer,
    modules:moduleReducer,
    courses:courseReducer,
    lessons:lessonReducer,
  },
});
export default store;