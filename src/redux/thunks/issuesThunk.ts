import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async ({
    owner,
    repo,
    page,
    limit = 10,
  }: {
    owner: string;
    repo: string;
    page: number;
    limit: number;
  }) => {
    const response = await api.get(`/github/issues`, {
      params: {
        owner,
        repo,
        page,
        limit,
      },
    });
    return response.data;
  },
);
