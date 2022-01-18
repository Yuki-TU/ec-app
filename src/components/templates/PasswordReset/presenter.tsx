import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '../../uiParts/TextInput';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { resetPassword } from '../../../reducks/users/operation';
import { useStyles } from './style';

/**
 * パスワードリセット画面のコンポーネント、
 * 登録されたアドレスにパスワードリセットURL記載のメールを送信
 * @return パスワードリセットコンポーネント
 */
function PasswordReset() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // 登録アドレス
  const [email, setEmail] = useState('');

  /** 入力メールアドレスの更新 */
  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>パスワードリセット</h2>
      <TextInput
        fullWidth
        label="登録済みのメールアドレス"
        multiline={false}
        required
        rows={1}
        value={email}
        type="email"
        onChange={inputEmail}
      />
      <div className={classes.button}>
        <PrimaryButton
          label="リセットメールを送信"
          onClick={() => {
            dispatch(resetPassword(email));
          }}
        />
      </div>
    </div>
  );
}

export default PasswordReset;
