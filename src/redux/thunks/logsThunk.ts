import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { FetchLogParams } from '../../types';

export const fetchLogs = createAsyncThunk(
  'logs/fetchLogs',
  async ({ page = 1 }: FetchLogParams) => {
    const response = await api.get(`/logs`, {
      params: {
        page: page,
      },
    });
    return response.data;
  },
);
