import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Issue } from '../types';
import IssuesListItem from './IssuesListItem';

interface IssuesListProps {
  issues: Issue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  return (
    <VStack align="start" w="full" mt={4}>
      {issues.map((issue: Issue) => (
        <IssuesListItem key={issue.id} {...issue} />
      ))}
    </VStack>
  );
};

export default IssuesList;
