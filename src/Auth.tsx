import React, { useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { loadSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';
import { useSelector } from './reducks/store';

/**
 * サインインであれば子要素を表示し、そうでなければ子要素は表示しない
 * @param param0 children - 子要素
 * @returns サインイン状況に応じたコンポーネント
 */
function Auth({ children }: { children: ReactElement }) {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const isSignedIn = loadSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      // 初回表示にログイン状態でないければ、firebase内でログイン状態を確認
      dispatch(listenAuthState());
    }
  }, []);

  // サインインしていないければ、Authの子要素は表示させない
  if (!isSignedIn) {
    return <div />;
  }
  // サインインしていれば、Authの子要素は表示させる
  return children;
}

export default Auth;
