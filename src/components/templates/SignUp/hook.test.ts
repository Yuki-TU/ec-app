import { validateForm, isValidEmailFormat, isValidRequiredInput } from './hook';

describe('isVaidEmailFormatはメールアドレスが正しいフォーマットか検証する', () => {
  describe('「*@*.*」はフォーマットとして正しい', () => {
    test('「test@gmail.com」は正しい', () => {
      const email = 'test@gmail.com';
      expect(isValidEmailFormat(email)).toBe(true);
    });
  });
  describe('「*」はフォーマットとして正しいくない', () => {
    test('「test」は正しくない', () => {
      const email = 'test';
      expect(isValidEmailFormat(email)).toBe(false);
    });
  });
  describe('「*@*」はフォーマットとして正しくない', () => {
    test('「test@gmail」は正しくない', () => {
      const email = 'test@gmail';
      expect(isValidEmailFormat(email)).toBe(false);
    });
  });
});

describe('isValidRequiredInputは渡された文字列配列に空文字があるか判断する', () => {
  describe('空文字("")が一つでもあればfalseを返す', () => {
    test('["", "test"]はfalseを返す', () => {
      const data = ['', 'test'];
      expect(isValidRequiredInput(data)).toBe(false);
    });
  });
  describe('空文字("")がなければtrueを返す', () => {
    test('["test1", "test2"]はtrueを返す', () => {
      const data = ['test1', 'test2'];
      expect(isValidRequiredInput(data)).toBe(true);
    });
  });
});

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
