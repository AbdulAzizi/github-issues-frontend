import { createSlice } from '@reduxjs/toolkit';
import { LogsState } from '../../types';
import { fetchLogs } from '../thunks/logsThunk';

const initialState: LogsState = {
  logs: [],
  status: 'idle',
  error: null,
};

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    resetLogs: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = action.payload.data;
        state.error = null;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.logs = [];
        state.error = action.error.message || 'Failed to fetch logs';
      });
  },
});
export const { resetLogs } = logSlice.actions;
export default logSlice.reducer;
