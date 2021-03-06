import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState } from '../store/initialState';
import type { User } from './types';

/**
 * ユーザー情報のスライス
 */
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    signInAction: (state: User, action: PayloadAction<User>) => {
      // 前回値に対して、データ変更箇所だけを更新しupdateDataに代入
      const updatedData = { ...state, ...action.payload };
      // ストアの値の更新
      return updatedData;
    },
    signOutAction: () => {
      // サインアウト時は初期値に戻す
      const updatedData = { ...initialUserState };
      return updatedData;
    },
    /**
     * お気に入り商品リストスライス
     * @param state 現在のUserステート
     * @param action 更新するお気に入り商品リスト
     * @returns 更新後のUser
     */
    updateFavoriteProductAction: (
      state: User,
      action: PayloadAction<string[]>
    ) => {
      const updatedData = { ...state, favoriteProducts: [...action.payload] };
      return updatedData;
    },
    /**
     * 出品商品リストスライス
     * @param state 現在のUserステート
     * @param action 更新する出品商品リスト
     * @returns 更新後のUser
     */
    updateExhibitedProductAction: (
      state: User,
      action: PayloadAction<string[]>
    ) => {
      const updatedData = { ...state, exhibitedProducts: [...action.payload] };
      return updatedData;
    },
    /**
     * 購入商品更新スライス
     * @param state 現在のUser
     * @param action 購入商品リスト
     * @returns 更新後のUser
     */
    updatePurchasedProductAction: (
      state: User,
      action: PayloadAction<string[]>
    ) => {
      const updatedData = { ...state, purchasedProducts: [...action.payload] };
      return updatedData;
    },
  },
});

// action creatorをエクスポート
export const {
  signInAction,
  signOutAction,
  updateFavoriteProductAction,
  updateExhibitedProductAction,
  updatePurchasedProductAction,
} = userSlice.actions;

// reducerをエクスポート
export const user = userSlice.reducer;
