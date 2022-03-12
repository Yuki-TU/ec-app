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

/** ユーザidの取得 */
export const loadUserId = createSelector([userSelector], (state) => state.uid);

/** サインインフラグの取得 */
export const loadSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);
/** お気に入り商品リストの取得 */
export const loadFavoriteProducts = createSelector(
  [userSelector],
  (state) => state.favoriteProducts
);
