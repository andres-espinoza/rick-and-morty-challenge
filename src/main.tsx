import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import store from './store';
import { apolloClient } from './graphql';
import App from './App';
import './main.css';
import rickAndMortyTheme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <ThemeProvider theme={rickAndMortyTheme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
