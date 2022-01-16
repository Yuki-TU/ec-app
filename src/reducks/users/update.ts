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
      const updatedData = { ...initialUserState, ...action.payload };
      // ストアの値の更新
      return updatedData;
    },
  },
});

// action creatorをエクスポート
export const { signInAction } = userSlice.actions;

// reducerをエクスポート
export const user = userSlice.reducer;
