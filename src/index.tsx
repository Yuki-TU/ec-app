import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as History from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import createStore from './reducks/store';
import theme from './assets/theme';
import './assets/globals.css';

/** URIの履歴を保持するhistory変数 */
const history = History.createBrowserHistory();
/** reduxのストア定義 */
const store = createStore(history);
// userQueryのクライアント
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
