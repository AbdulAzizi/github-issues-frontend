import React from 'react';
import { Box, Text, Badge, HStack, VStack, Link } from '@chakra-ui/react';
import { Issue, IssueLabel } from '../types';

const IssuesListItem: React.FC<Issue> = ({
  title,
  number,
  created_at,
  labels,
  url,
}) => {
  return (
    <Box
      w="full"
      p={4}
      mb={4}
      borderWidth="1px"
      borderRadius="md"
      _hover={{ bg: 'gray.50', shadow: 'md' }}
      transition="0.2s"
    >
      <HStack spaceX={4} align="start">
        <VStack align="start" spaceX={1} w="full">
          <Link href={url} fontWeight="bold" fontSize="lg" color="blue.500">
            {title}
          </Link>

          <Text fontSize="sm" color="gray.600">
            #{number} opened on {new Date(created_at).toLocaleDateString()}
          </Text>

          <HStack spaceX={2} wrap="wrap">
            {labels.map((label: IssueLabel) => (
              <Badge
                key={label.id}
                fontSize="0.8em"
                colorScheme="teal"
                bg={`#${label.color}`}
                color={label.color === 'b60205' ? 'white' : 'black'}
                px={2}
                py={1}
                borderRadius="md"
              >
                {label.name}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default IssuesListItem;
