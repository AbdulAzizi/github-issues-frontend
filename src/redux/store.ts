import { configureStore } from "@reduxjs/toolkit";
import issuesSlice from "./slices/issuesSlice";

const store = configureStore({
  reducer: {
    issues: issuesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
