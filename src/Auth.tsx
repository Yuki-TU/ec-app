import React, { useEffect, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';
import { useSelector } from './reducks/store';
import { Dialog } from './components/uniqueParts/Dialog';

/**
 * サインインであれば子要素を表示し、そうでなければ子要素は表示しない
 * @param param0 children - 子要素
 * @returns サインイン状況に応じたコンポーネント
 */
function Auth({ children }: { children: ReactElement }) {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const isSignedIn = loadSignedIn(selector);
  const [openFailureDialog, setOpenFailureDialog] = useState(false);

  useEffect(() => {
    (async () => {
      // 初回表示にログイン状態でないければ、firebase内でログイン状態を確認
      if (!isSignedIn) {
        try {
          // HACK: awaiは不要とあるが、取り除くとエラーモーダルがうまく動作しないため付与
          await dispatch(listenAuthState());
        } catch (error) {
          setOpenFailureDialog(true);
        }
      }
    })();
  }, []);

  // サインインしていないければ、Authの子要素は表示させない
  // 通信エラーの際は、エラーモーダルを表示
  if (!isSignedIn) {
    return (
      <Dialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="不具合が発生しました。通信状況を確認しリロードし直してください。"
      />
    );
  }
  // サインインしていれば、Authの子要素は表示させる
  return children;
}

export default Auth;
