import React from 'react';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { TextInput } from '../../uiParts/TextInput';
import { TextLink } from '../../uiParts/TextLink';
import { Dialog } from '../../uniqueParts/Dialog';

type Props = {
  /** サインインボタンを押した時の処理 */
  onClickSignIn: React.ReactEventHandler<HTMLDivElement>;
  /** 名前のステート更新 */
  inputUserName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 入力値の名前 */
  userName: string;
  /** メールアドレス更新関数 */
  inputEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** パスワード更新関数 */
  inputPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 確認パスワード更新関数 */
  inputConfirmPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 入力パスワード */
  password: string;
  /** 確認パスワード */
  confirmPassword: string;
  /** 入力メール */
  email: string;
  /** サインアップ送信 */
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  /** 失敗サインアップ失敗ダイアログ表示フラグ */
  openSignUpFailureDialog: boolean;
  /** 失敗ダイアログセット関数 */
  setOpenSignUpFailureDialog: React.Dispatch<React.SetStateAction<boolean>>;
  /** フォーマットが異なるダイアログ表示フラグ */
  openFailureDialog: boolean;
  /** フォーマットが異なるダイアログセット関数 */
  setOpenFailureDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * サインアップ画面のコンポーネント
 * @return サインアップコンポーネント
 */
const SignUp = React.memo((props: Props) => (
  <div className="p-[1rem] my-0 mx-auto w-[calc(100%_-_2rem)] max-w-[400px] h-auto text-center">
    <Dialog
      isOpen={props.openSignUpFailureDialog}
      setIsOpen={props.setOpenSignUpFailureDialog}
      title="⚠エラー"
      text="サインアップに失敗しました。もう一度やり直してください。"
    />
    <h2 className="mx-auto mt-0 mb-[1rem] text-[1.563rem] text-center text-[#4dd0e1]">
      アカウント登録
    </h2>
    <form onSubmit={props.onSubmit}>
      <Dialog
        isOpen={props.openFailureDialog}
        setIsOpen={props.setOpenFailureDialog}
        title="警告"
        text="パスワードが一致しません。パスワードと確認用パスワードは同じ値を入力してください。"
      />
      <TextInput
        fullWidth
        label="ユーザ名"
        multiline={false}
        required
        rows={1}
        value={props.userName}
        type="text"
        onChange={props.inputUserName}
      />
      <TextInput
        fullWidth
        label="メールアドレス"
        multiline={false}
        required
        rows={1}
        value={props.email}
        type="email"
        onChange={props.inputEmail}
      />
      <TextInput
        fullWidth
        label="パスワード（半角英数字6文字以上）"
        minLength={6}
        multiline={false}
        required
        rows={1}
        value={props.password}
        type="password"
        onChange={props.inputPassword}
      />
      <TextInput
        fullWidth
        label="パスワードの再確認"
        minLength={6}
        multiline={false}
        required
        rows={1}
        value={props.confirmPassword}
        type="password"
        onChange={props.inputConfirmPassword}
      />
      <PrimaryButton label="登録" type="submit" />
    </form>
    <TextLink
      label="アカウントをお持ちの方はこちら"
      onClick={props.onClickSignIn}
    />
  </div>
));

export default SignUp;
