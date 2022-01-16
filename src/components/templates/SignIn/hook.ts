import {
  isValidEmailFormat,
  isValidRequiredInput,
} from '../../../reducks/users/operation';

/**
 * サインインのための入力データが正しいフォーマットか検証
 * @param email メールアドレス
 * @param password パスワード
 * @returns (ture: OK, false: NG)
 */
export const validateSignInForm = (email: string, password: string) => {
  if (!isValidRequiredInput([email, password])) {
    alert('必須項目が未入力です。');
    return false;
  }
  if (!isValidEmailFormat(email)) {
    alert('メールアドレスの形式が不正です。もう1度お試しください。');
    return false;
  }
  if (password.length < 6) {
    alert('パスワードは6文字以上で入力してください。');
    return false;
  }
  return true;
};
