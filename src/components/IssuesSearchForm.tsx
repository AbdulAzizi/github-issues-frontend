import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, VStack, Heading, HStack } from '@chakra-ui/react';
import { Field, toaster, Button } from './ui';
import IssuesList from './IssuesList';
import IssueDetails from './IssueDetailed';
import { fetchIssues } from '../redux/thunks/issuesThunk';
import { resetIssues } from '../redux/slices/issuesSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const SearchForm: React.FC = () => {
  const [owner, setOwner] = useState('facebook');
  const [repo, setRepo] = useState('react');
  const containerRef = useRef<HTMLDivElement>(null);
  const { issues, status, error, currentIssue } = useAppSelector(
    (state) => state.issues,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error)
      toaster.create({
        description: error,
        type: 'error',
      });
    return () => {
      dispatch(resetIssues());
    };
  }, [error, dispatch]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentIssue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner || !repo) {
      toaster.create({
        description: 'Both Owner and Repo are required',
        type: 'info',
      });
      return;
    }
    dispatch(fetchIssues({ owner, repo, page: 1 }));
  };

  return (
    <VStack
      w="full"
      maxW="6xl"
      mx="auto"
      p={8}
      boxShadow="lg"
      borderRadius="lg"
    >
      <Heading as="h2" size="lg" mb={4}>
        GitHub Issues Search
      </Heading>
      <HStack gap="10" width="full">
        <Field>
          <Input
            placeholder="Owner"
            name="name"
            onChange={(e) => setOwner(e.target.value)}
            value={owner}
          />
        </Field>

        <Field>
          <Input
            placeholder="Repo"
            name="name"
            onChange={(e) => setRepo(e.target.value)}
            value={repo}
          />
        </Field>

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          loading={status === 'loading'}
        >
          Search Issues
        </Button>
      </HStack>

      <Box
        width="full"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 300px)',
          boxShadow: issues.length
            ? 'inset 0px -10px 10px -10px rgba(0, 0, 0, 0.3)'
            : 'none',
        }}
        mt={4}
        ref={containerRef}
      >
        {currentIssue ? (
          <IssueDetails issue={currentIssue} />
        ) : (
          <IssuesList issues={issues} />
        )}
      </Box>
    </VStack>
  );
};

export default SearchForm;
