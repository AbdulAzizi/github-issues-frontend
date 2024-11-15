import React, { useRef, useEffect } from 'react';
import { VStack, Spinner } from '@chakra-ui/react';
import { Issue } from '../types';
import IssuesListItem from './IssuesListItem';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchIssues } from '../redux/thunks/issuesThunk';
import { toaster } from './ui';
interface IssuesListProps {
  issues: Issue[];
  owner: string;
  repo: string;
}

const IssuesList: React.FC<IssuesListProps> = ({ issues, owner, repo }) => {
  const dispatch = useAppDispatch();
  const issuesContainerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const { status, page } = useAppSelector((state) => state.issues);

  useEffect(() => {
    const container = issuesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page]);

  const handleScroll = () => {
    if (issuesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        issuesContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreItems();
      }
    }
  };

  const loadMoreItems = async () => {
    if (status !== 'loading' && !isFetching.current) {
      isFetching.current = true;
      try {
        await dispatch(
          fetchIssues({
            owner,
            repo,
            page,
            limit: import.meta.env.VITE_ISSUES_PER_FETCH,
          }),
        ).unwrap();
      } finally {
        isFetching.current = false;
        toaster.create({
          description: 'Successfully fetched 10 items',
          type: 'success',
        });
      }
    }
  };

  return (
    <VStack
      style={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 300px)',
        boxShadow: issues.length
          ? 'inset 0px -10px 10px -10px rgba(0, 0, 0, 0.3)'
          : 'none',
      }}
      align="start"
      w="full"
      ref={issuesContainerRef}
    >
      {issues.map((issue: Issue) => (
        <IssuesListItem key={issue.id} {...issue} />
      ))}
      {status === 'loading' && (
        <VStack w="full" justify="center" py={10}>
          <Spinner size="xl" color="blue.500" />
        </VStack>
      )}
    </VStack>
  );
};

export default IssuesList;
