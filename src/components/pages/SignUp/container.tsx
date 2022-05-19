import { push } from 'connected-react-router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../reducks/users/operations';
import { useInputValue, validatePassword } from './hooks';
import SignUp from './presenter';

const SignUpContaner = () => {
  const dispatch = useDispatch();

  // ダイアログを管理するステート
  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  const [openSignUpFailureDialog, setOpenSignUpFailureDialog] = useState(false);

  // 入力要素を扱うステート
  const [userName, inputUserName] = useInputValue();
  const [email, inputEmail] = useInputValue();
  const [password, inputPassword] = useInputValue();
  const [confirmPassword, inputConfirmPassword] = useInputValue();

  // サインインへ飛ぶリンク
  const onClickSignIn = React.useCallback(
    () => dispatch(push('./signin')),
    [dispatch, push]
  );

  // サインアップデータ送信
  const handleSignUp = async () => {
    try {
      // HACK: awaitが必要ないと言われるが、ないとエラーダイアログ出せないので追加jjjjjkkkjjj
      await dispatch(signUp(userName, email, password));
    } catch {
      setOpenSignUpFailureDialog(true);
    }
  };

  // サインアップボタンを押した時
  const onSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      if (validatePassword(password, confirmPassword)) {
        handleSignUp();
      } else {
        setOpenFailureDialog(true);
      }
    },
    [handleSignUp, setOpenFailureDialog, validatePassword]
  );

  const props = {
    email,
    userName,
    password,
    confirmPassword,
    inputUserName,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    onSubmit,
    openSignUpFailureDialog,
    setOpenSignUpFailureDialog,
    openFailureDialog,
    setOpenFailureDialog,
    onClickSignIn,
  };

  return <SignUp {...props} />;
};

export default SignUpContaner;
