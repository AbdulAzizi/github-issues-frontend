export interface Issue {
  id: number;
  title: string;
  body: string;
  user: {
    login: string;
  };
  state: string;
  created_at: string;
  updated_at: string;
}

export interface FetchIssuesParams {
  owner: string;
  repo: string;
  page: number;
}

export interface IssuesState {
  issues: Issue[];
  currentIssue: Issue | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}
