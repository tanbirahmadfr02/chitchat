import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
