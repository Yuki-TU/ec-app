import { createSelector } from 'reselect';
import { RootState } from '../store';

const userSelector = (state: RootState) => state.user;

/** ユーザメールアドレスの取得 */
export const loadUserEmail = createSelector(
  [userSelector],
  (state) => state.email
);
/** ユーザー名の取得 */
export const loadUserName = createSelector(
  [userSelector],
  (state) => state.username
);
/** サインインフラグの取得 */
export const loadSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);
