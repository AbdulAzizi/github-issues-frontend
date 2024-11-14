import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchForm from './components/IssuesSearchForm';
import { Toaster } from './components/ui';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SearchForm />
      <Toaster />
    </Provider>
  );
};

export default App;
