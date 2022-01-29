import { validatePassword } from './hook';

describe('validPasswordはパスワードと確認パスワードが一致するか判断', () => {
  beforeAll(() => {
    // window.alertをモックにする。Jestではモックにしないとエラーになる
    window.alert = jest.fn();
  });
  describe('passwordと確認passwordが異なっている場合はfalse', () => {
    test(`passworと確認passworがtestpasswordとtesttestの場合はfalse`, () => {
      expect(validatePassword('testpassword', 'testtest')).toBe(false);
    });
  });
  describe('passwordと確認passwordが同じ場合はtrue', () => {
    test(`passworと確認passworがtestpasswordとtestpasswordの場合はfalse`, () => {
      expect(validatePassword('testpassword', 'testpassword')).toBe(true);
    });
  });
});
