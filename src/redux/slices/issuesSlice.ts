import { createSlice } from "@reduxjs/toolkit";
import { IssuesState } from "../../types";
import { fetchIssues } from "../thunks/issuesThunk";

const initialState: IssuesState = {
  issues: [],
  currentIssue: null,
  status: "idle",
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default issuesSlice.reducer;
