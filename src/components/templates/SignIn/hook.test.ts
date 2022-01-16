import { validateSignInForm } from './hook';

describe('ValidateSignInFormはサインインフォームが正しいかを判断', () => {
  beforeAll(() => {
    // window.alertをモックにする。Jestではモックにしないとエラーになる
    window.alert = jest.fn();
  });
  describe('passworの文字数6文字未満は許容しない', () => {
    test('passworの文字数5文字(testt)の時はfalse', () => {
      expect(validateSignInForm('email@gmail.com', 'testt')).toBe(false);
    });
    test('passworの文字数6文字(testte)の時はtrue', () => {
      expect(validateSignInForm('email@gmail.com', 'testte')).toBe(true);
    });
  });
});
