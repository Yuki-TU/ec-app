import { useCallback, useState } from 'react';

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

/**
 * 入力のステートと入力値更新のためのステートを返すカスタムフック
 * @param initValue ステートの初期値
 * @returns [ステート、更新の関数]
 */
export function useInputValue(
  initValue = ''
): [string, (event: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(initValue);
  const updateValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );
  return [value, updateValue];
}
