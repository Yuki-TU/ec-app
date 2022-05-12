import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/styles';
import { TextInput } from '../../uiParts/TextInput';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { signUp } from '../../../reducks/users/operations';
import { validatePassword } from './hook';
import { TextLink } from '../../uiParts/TextLink';
import { Dialog } from '../../uniqueParts/Dialog';

/** スタイル */
const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: '400px',
    padding: '1rem',
    height: 'auto',
    width: 'calc(100% - 2rem)',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#4dd0e1',
    fontSize: '1.563rem',
    margin: '0 auto 1rem auto',
  },
});

/**
 * サインアップ画面のコンポーネント
 * @return サインアップコンポーネント
 */
function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // ユーザ登録に関する情報ステータス
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ダイアログを管理するステート
  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  const [openSignUpFailureDialog, setOpenSignUpFailureDialog] = useState(false);

  const inputUserName = useCallback(
    (event) => {
      setUserName(event.target.value);
    },
    [setUserName]
  );

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  const handleSignUp = async () => {
    try {
      // HACK: awaitが必要ないと言われるが、ないとエラーダイアログ出せないので追加jjjjjkkkjjj
      await dispatch(signUp(userName, email, password));
    } catch (error) {
      setOpenSignUpFailureDialog(true);
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        isOpen={openSignUpFailureDialog}
        setIsOpen={setOpenSignUpFailureDialog}
        title="⚠エラー"
        text="サインアップに失敗しました。もう一度やり直してください。"
      />
      <h2 className={classes.title}>アカウント登録</h2>
      <form
        onSubmit={React.useCallback(
          (event) => {
            event.preventDefault();
            if (validatePassword(password, confirmPassword)) {
              handleSignUp();
            } else {
              setOpenFailureDialog(true);
            }
          },
          [handleSignUp, setOpenFailureDialog, validatePassword]
        )}
      >
        <Dialog
          isOpen={openFailureDialog}
          setIsOpen={setOpenFailureDialog}
          title="警告"
          text="パスワードが一致しません。パスワードと確認用パスワードは同じ値を入力してください。"
        />
        <TextInput
          fullWidth
          label="ユーザ名"
          multiline={false}
          required
          rows={1}
          value={userName}
          type="text"
          onChange={inputUserName}
        />
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
        <TextInput
          fullWidth
          label="パスワードの再確認"
          minLength={6}
          multiline={false}
          required
          rows={1}
          value={confirmPassword}
          type="password"
          onChange={inputConfirmPassword}
        />
        <PrimaryButton label="登録" type="submit" />
      </form>
      <TextLink
        label="アカウントをお持ちの方はこちら"
        onClick={React.useCallback(
          () => dispatch(push('./signin')),
          [dispatch, push]
        )}
      />
    </div>
  );
}

export default React.memo(SignUp);
