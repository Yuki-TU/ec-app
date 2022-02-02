import { createSelector } from 'reselect';
import { RootState } from '../store';

const productsSelector = (state: RootState) => state.products;

/**
 * 商品情報一覧を取得
 */
export const loadProducts = createSelector(
  [productsSelector],
  (state) => state.list
);
