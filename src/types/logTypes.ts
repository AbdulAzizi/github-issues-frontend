export interface LogEntry {
  _id: string;
  ip: string;
  timestamp: string;
  type: "get_issues" | "get_issue" | "search_issues";
  additionalInfo?: string;
}

export interface LogsState {
  logs: LogEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
}
