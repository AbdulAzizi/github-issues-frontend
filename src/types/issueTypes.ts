export interface IssueLabel {
  name: string;
  color: string;
  id: number;
}

export interface Issue {
  id: number;
  title: string;
  body: string;
  user: {
    login: string;
  };
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  number: number;
  labels: IssueLabel[];
  url: string;
}

export interface FetchIssuesParams {
  owner: string;
  repo: string;
  page: number;
}

export interface IssuesState {
  issues: Issue[];
  currentIssue: Issue | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
