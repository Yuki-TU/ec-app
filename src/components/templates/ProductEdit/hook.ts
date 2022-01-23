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
 * 商品登録フォームの検証
 * @param name 商品名
 * @param description 説明
 * @param category カテゴリ
 * @param gender 性別
 * @param price 値段
 * @returns true: OK, false: NG
 */
export function validateProductAddForm(
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string
) {
  if (!isValidRequiredInput([name, description, category, gender, price])) {
    alert('必須項目が未入力です。');
    return false;
  }
  return true;
}
