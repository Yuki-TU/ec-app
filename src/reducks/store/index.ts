import {
  applyMiddleware,
  combineReducers,
  createStore as reduxCreateStore,
} from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as History from 'history';
import thunk from 'redux-thunk';

/**
 * リデューサーを一つにまとめストアを作成
 * @param history URIの履歴情報
 * @return ストア
 */
export default function createStore(history: History.History) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
    }),
    applyMiddleware(thunk, routerMiddleware(history))
  );
}
