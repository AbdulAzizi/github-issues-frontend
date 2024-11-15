import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from './components/ui';
import PageTabs from './components/PageTabs';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PageTabs />
      <Toaster />
    </Provider>
  );
};

export default App;
