export interface LogEntry {
  id: string;
  ip: string;
  timestamp: string;
  requestType: 'get_issues' | 'get_issue' | 'search_issues';
  details: { url: string; headers: object };
}

export interface LogsState {
  logs: LogEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface FetchLogParams {
  page?: number;
}
