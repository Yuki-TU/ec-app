import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as History from 'history';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import createStore from './reducks/store';
import theme from './assets/theme';

/** URIの履歴を保持するhistory変数 */
const history = History.createBrowserHistory();
/** reduxのストア定義 */
const store = createStore(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
