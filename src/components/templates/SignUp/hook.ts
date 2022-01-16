import {
  isValidRequiredInput,
  isValidEmailFormat,
} from '../../../reducks/users/operation';

/**
 * 入力データが正しいフォーマットか検証
 * @param userName ユーザ名
 * @param email メールアドレス
 * @param password パスワード
 * @param confirmPassword 確認用パスワード
 * @returns (ture: OK, false: NG)
 */
export const validateForm = (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (!isValidRequiredInput([email, password, confirmPassword])) {
    alert('必須項目が未入力です。');
    return false;
  }
  if (!isValidEmailFormat(email)) {
    alert('メールアドレスの形式が不正です。もう1度お試しください。');
    return false;
  }
  if (password !== confirmPassword) {
    alert('パスワードが一致しません。もう1度お試しください。');
    return false;
  }
  if (password.length < 6) {
    alert('パスワードは6文字以上で入力してください。');
    return false;
  }
  return true;
};
