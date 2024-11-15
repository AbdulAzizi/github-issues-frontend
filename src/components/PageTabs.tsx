import React, { Suspense } from 'react';
import { Tabs, Spinner, VStack } from '@chakra-ui/react';

const IssuesSearchForm = React.lazy(() => import('./IssuesSearchForm'));
const LogsList = React.lazy(() => import('./LogsList'));

const PageTabs: React.FC = () => {
  return (
    <Tabs.Root
      lazyMount
      unmountOnExit
      defaultValue="tab-issues"
      variant="enclosed"
      w="full"
      maxW="4xl"
      mx="auto"
      p={4}
    >
      <Tabs.List>
        <Tabs.Trigger value="tab-issues">Issues</Tabs.Trigger>
        <Tabs.Trigger value="tab-logs">Logs</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="tab-issues">
        <Suspense
          fallback={
            <VStack w="full" justify="center" py={10}>
              <Spinner size="xl" color="blue.500" />
            </VStack>
          }
        >
          <IssuesSearchForm />
        </Suspense>
      </Tabs.Content>

      <Tabs.Content value="tab-logs">
        <Suspense
          fallback={
            <VStack w="full" justify="center" py={10}>
              <Spinner size="xl" color="blue.500" />
            </VStack>
          }
        >
          <LogsList />
        </Suspense>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default PageTabs;
