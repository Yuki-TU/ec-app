/**
 * メールアドレスの検証
 * @param email - 検証したいEメール
 * @return (true: OK, false: NG)
 */
export const isValidEmailFormat = (email: string) => {
  const regex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return regex.test(email);
};
/**
 * 入力値の配列に空文字があるかを判断する、
 * 一つでも空文字があれば、falseを返す
 * @param args - 文字列の配列
 * @return (true: 空文字がない, false: 空文字がある)
 */
export const isValidRequiredInput = (args: string[]): boolean => {
  let validator = true;
  args.forEach((arg: string) => {
    if (arg === '') {
      validator = false;
    }
  });
  return validator;
};

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
