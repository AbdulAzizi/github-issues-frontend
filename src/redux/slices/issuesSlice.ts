import { createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '../../types';
import { fetchIssues } from '../thunks/issuesThunk';

const initialState: IssuesState = {
  issues: [],
  currentIssue: null,
  status: 'idle',
  error: null,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    resetIssues: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = action.payload;
        state.error = null;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.issues = [];
        state.error = action.error.message || 'Failed to fetch issues';
      });
  },
});
export const { resetIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
