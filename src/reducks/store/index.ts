import {
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
} from '@reduxjs/toolkit';
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from 'connected-react-router';
import * as History from 'history';
import {
  TypedUseSelectorHook,
} from 'react-redux';
import thunk from 'redux-thunk';

/**
 * ルートリデューサーの型
 */
export type RootState = {
  router: RouterState<unknown>;
};

/**
 * リデューサーを一つにまとめストアを作成
 * @param history URIの履歴情報
 * @return ストア
 */
export default function createStore(history: History.History) {
  return configureStore<
    RootState,
    AnyAction,
    Middleware<unknown, unknown, Dispatch<AnyAction>>[]
  >({
    reducer: {
      router: connectRouter(history),
    },
    middleware: [routerMiddleware(history), thunk],
  });
}
