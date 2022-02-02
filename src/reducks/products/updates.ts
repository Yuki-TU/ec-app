import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialProductState } from '../store/initialState';
import type { Products, ProductForDatabase } from './types';

/**
 * ユーザー情報のスライス
 */
const userSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    /** 商品データを全て更新 */
    fetchProductsAction: (
      state: Products,
      action: PayloadAction<ProductForDatabase[]>
    ) => {
      // レンダリングを入らせるため新たな配列精製をする[...action.payload]の記述をする
      const updatedData = { ...state, list: [...action.payload] };
      return updatedData;
    },
  },
});

// action creatorをエクスポート
export const { fetchProductsAction } = userSlice.actions;

// reducerをエクスポート
export const products = userSlice.reducer;
