import { createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '../../types';
import { fetchIssues } from '../thunks/issuesThunk';

const initialState: IssuesState = {
  issues: [],
  currentIssue: null,
  status: 'idle',
  error: null,
  page: 1,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    resetIssues: () => initialState,
    setCurrentIssue: (state, action) => {
      state.currentIssue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = [...state.issues, ...action.payload.data];
        state.error = null;
        state.page += 1;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch issues';
      });
  },
});
export const { resetIssues, setCurrentIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
