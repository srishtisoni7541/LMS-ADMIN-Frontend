import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/reducers/authSlice";
import userReducer from '../../src/reducers/userSlice';
import instructorReducer from '../../src/reducers/instructorSlice';
import moduleReducer from '../../src/reducers/moduleSlice';
import courseReducer from '../../src/reducers/userSlice';
import lessonReducer from  '../../src/reducers/lessonSlice';
import certificateReducer from '../../src/reducers/certificateSlice';
import enrollReducer from '../../src/reducers/enrollSlice';


 const store = configureStore({
  reducer: {
    auth: authReducer,
    users:userReducer,
    instructors:instructorReducer,
    modules:moduleReducer,
    courses:courseReducer,
    lessons:lessonReducer,
    certificates:certificateReducer,
    enrolls:enrollReducer,
  },
});
export default store;