import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from './slices/issuesSlice';
import logsSlice from './slices/logsSlice';

const store = configureStore({
  reducer: {
    issues: issuesSlice,
    logs: logsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
