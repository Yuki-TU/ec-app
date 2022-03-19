/**
 * パスワードが一致しているかどうかを検証
 * @param password パスワード
 * @param confirmPassword 確認用パスワード
 * @returns true: 一致, false: 不一致
 */
export function validatePassword(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
}
