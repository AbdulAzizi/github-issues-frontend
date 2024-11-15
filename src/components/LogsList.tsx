import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetLogs } from '../redux/slices/logsSlice';
import { fetchLogs } from '../redux/thunks/logsThunk';
import { Box, VStack, Spinner, Text } from '@chakra-ui/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '../components/ui/accordion';
import { LogEntry } from '../types';

import { toaster } from './ui';

const LogsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { logs, status, error } = useAppSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs({}));

    return () => {
      dispatch(resetLogs());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error)
      toaster.create({
        description: error,
        type: 'error',
      });
  }, [error, dispatch]);

  if (status === 'loading') {
    return (
      <VStack w="full" justify="center" py={10}>
        <Spinner size="xl" color="blue.500" />
      </VStack>
    );
  }

  return (
    <VStack align="stretch" w="full">
      {logs.map((log: LogEntry, index) => (
        <Box
          key={log.id || index}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="lg">
            Request Type: {log.requestType}
          </Text>
          <Text>IP: {log.ip}</Text>
          <Text>Time: {new Date(log.timestamp).toLocaleString()}</Text>
          <Text>URL: {log.details.url}</Text>
          <AccordionRoot collapsible mt={4}>
            <AccordionItem key={log.id} value={log.id}>
              <AccordionItemTrigger>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Details
                </Box>
              </AccordionItemTrigger>

              <AccordionItemContent pb={4}>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  {Object.entries(log.details.headers).map(([key, value]) => (
                    <li key={key} style={{ marginBottom: '0.5rem' }}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        </Box>
      ))}
    </VStack>
  );
};

export default LogsList;
