import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { TextInput } from '../../uiParts/TextInput';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { signIn } from '../../../reducks/users/operations';
import { useStyles } from './style';
import { TextLink } from '../../uiParts/TextLink';
import { Dialog } from '../../uiParts/Dialog';

/**
 * サインイン画面のコンポーネント
 * @return サインアップコンポーネント
 */
function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // ユーザ登録に関する情報ステータス
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // エラーダイアログステート
  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /** 入力メールアドレスの更新 */
  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  /** 入力パスワードの更新 */
  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const handleSignIn = async () => {
    try {
      await dispatch(signIn(email, password));
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'サインインできたが、データベースに値がない'
      ) {
        setErrorMessage(
          '不具合が発生しました。大変申し訳ございませんが、アカウントを作り直してください。'
        );
        setOpenFailureDialog(true);
        return;
      }
      setErrorMessage(
        '認証に失敗しました。メールアドレスとパスワードが正しいかもう一度ご確認ください。"'
      );
      setOpenFailureDialog(true);
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text={errorMessage}
      />
      <h2 className={classes.title}>サインイン</h2>
      <form
        onSubmit={(event) => {
          // 実際にフォーム送信しないため、以下を追加
          event.preventDefault();
          handleSignIn();
        }}
      >
        <TextInput
          fullWidth
          label="メールアドレス"
          multiline={false}
          required
          rows={1}
          value={email}
          type="email"
          onChange={inputEmail}
        />
        <TextInput
          fullWidth
          label="パスワード（半角英数字6文字以上）"
          minLength={6}
          multiline={false}
          required
          rows={1}
          value={password}
          type="password"
          onChange={inputPassword}
        />
        <div className={classes.button}>
          <PrimaryButton label="サインイン" type="submit" />
        </div>
      </form>
      <TextLink
        label="アカウントをお持ちでない方はこちら"
        onClick={() => {
          dispatch(push('./signup'));
        }}
      />
      <TextLink
        label="パスワードを忘れた方はこちら"
        onClick={() => {
          dispatch(push('./signin/reset'));
        }}
      />
    </div>
  );
}

export default SignUp;
