import { configureStore } from "@reduxjs/toolkit";
import userReducre from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducre,
  },
});

export default appStore;
