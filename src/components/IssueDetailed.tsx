import React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  TagLabel,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Tag, Button } from '../components/ui';
import { MdRadioButtonUnchecked, MdCheckCircleOutline } from 'react-icons/md';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Issue } from '../types';
import { useAppDispatch } from '../hooks';
import { setCurrentIssue } from '../redux/slices/issuesSlice';

type IssueDetailsProps = {
  issue: Issue;
};

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
  const dispatch = useAppDispatch();
  const unselectCurrentIssue = () => {
    dispatch(setCurrentIssue(null));
  };

  const isOpen = issue.state === 'open';

  return (
    <Box
      mx="auto"
      mt={4}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor="white"
    >
      <VStack align="start" spaceX={4}>
        <Flex align="center">
          <Button
            mr={4}
            colorPalette="black"
            variant="ghost"
            onClick={unselectCurrentIssue}
          >
            <RiArrowLeftLine />
          </Button>

          <Heading as="h1" size="lg">
            {issue.title}
          </Heading>
          <Text fontSize="lg" color="gray.500" ml={2}>
            #{issue.number}
          </Text>
        </Flex>

        <HStack>
          <Icon color={isOpen ? 'green.500' : 'red.500'}>
            {isOpen ? <MdRadioButtonUnchecked /> : <MdCheckCircleOutline />}
          </Icon>
          <Text fontWeight="bold" color={isOpen ? 'green.500' : 'red.500'}>
            {isOpen ? 'Open' : 'Closed'}
          </Text>
          <Text color="gray.600">
            opened on {new Date(issue.created_at).toLocaleDateString()} by{' '}
            <Text as="span" fontWeight="bold">
              {issue.user.login}
            </Text>
          </Text>
        </HStack>

        <HStack spaceX={2} wrap="wrap">
          {issue.labels.map((label) => (
            <Tag
              key={label.id}
              bg={`#${label.color}`}
              color="white"
              size="sm"
              borderRadius="full"
            >
              <TagLabel>{label.name}</TagLabel>
            </Tag>
          ))}
        </HStack>

        <Box mt={4} w="full" divideX="2px">
          <Text fontSize="md" whiteSpace="pre-wrap" color="gray.700">
            {issue.body}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default IssueDetails;
