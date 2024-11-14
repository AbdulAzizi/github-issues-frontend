import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async ({
    owner,
    repo,
    page = 1,
  }: {
    owner: string;
    repo: string;
    page: number;
  }) => {
    const response = await api.get(`/github/issues`, {
      params: {
        owner,
        repo,
        page,
      },
    });
    return response.data;
  }
);
