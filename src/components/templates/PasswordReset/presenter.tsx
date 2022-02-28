import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '../../uiParts/TextInput';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { resetPassword } from '../../../reducks/users/operations';
import { useStyles } from './style';
import { Dialog } from '../../uiParts/Dialog';

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
  // エラーダイアログステート
  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  // リセットメール送信成功ステート
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  /** 入力メールアドレスの更新 */
  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const handleResetPassword = async () => {
    try {
      // HACK; awaitは不必要とあるが、ないとエラーがダイアログがうまく動作しないため指定
      await dispatch(resetPassword(email));
      setOpenSuccessDialog(true);
    } catch (error) {
      setOpenFailureDialog(true);
    }
  };
  return (
    <div className={classes.root}>
      <Dialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="メールアドレスが正しいか確認し、もう一度実行してください。"
      />
      <Dialog
        isOpen={openSuccessDialog}
        setIsOpen={setOpenSuccessDialog}
        title="成功"
        text="指定アドレスにパスワードリセットメールを送信しました。ご確認ください。"
        onClick={() => dispatch(push('/signin'))}
      />
      <h2 className={classes.title}>パスワードリセット</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleResetPassword();
        }}
      >
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
          <PrimaryButton label="リセットメールを送信" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
