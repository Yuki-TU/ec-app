import React from 'react';
import ReactDOM from 'react-dom';
import * as History from 'history';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
/** URIの履歴を保持するhistory変数 */
const history = History.createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
