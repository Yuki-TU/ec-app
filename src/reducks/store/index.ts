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
  useSelector as useReduxSelector, // 別名インポートする
} from 'react-redux';
import thunk from 'redux-thunk';
import { products } from '../products/updates';
import { Products } from '../products/types';
import { user } from '../users/update';
import { User } from '../users/types';

/**
 * ルートリデューサーの型
 */
export type RootState = {
  products: Products;
  router: RouterState<unknown>;
  user: User;
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
      products,
      router: connectRouter(history),
      user,
    },
    middleware: [routerMiddleware(history), thunk],
  });
}

/** useSelectorをrottStateの型付けしてエクスポート(useSelectorを利用する場合はこちらを利用) */
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
