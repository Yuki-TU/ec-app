import { validateForm } from './hook';

describe('ValidFormはフォームが正しいかを判断', () => {
  beforeAll(() => {
    // window.alertをモックにする。Jestではモックにしないとエラーになる
    window.alert = jest.fn();
  });
  describe('passwordと確認passwordが異なっている場合はfalse', () => {
    test(`passworと確認passworがtestpasswordとtesttestの場合はfalse`, () => {
      expect(
        validateForm('test', 'email@gmail.com', 'testpassword', 'testtest')
      ).toBe(false);
    });
  });
  describe('passworの文字数6文字以下はfalse', () => {
    test('passworの文字数4文字(test)の時はfalse', () => {
      expect(validateForm('test', 'email@gmail.com', 'test', 'test')).toBe(
        false
      );
    });
  });
});
