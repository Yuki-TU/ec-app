import { validateProductAddForm } from './hook';

describe('validateProductAddFormは渡された文字列配列に空文字があるか判断する', () => {
  beforeAll(() => {
    // window.alertをモックにする。Jestではモックにしないとエラーになる
    window.alert = jest.fn();
  });
  describe('空文字("")が一つでもあればfalseを返す', () => {
    test('nameが空はfalseを返す', () => {
      const name = '';
      const description = 'test';
      const category = 'test';
      const gender = 'test';
      const price = 'test';
      expect(
        validateProductAddForm(name, description, category, gender, price)
      ).toBe(false);
    });
  });
  describe('空文字("")がなければtrueを返す', () => {
    test('すべてtestの文字列はtrueを返す', () => {
      const name = 'test';
      const description = 'test';
      const category = 'test';
      const gender = 'test';
      const price = 'test';
      expect(
        validateProductAddForm(name, description, category, gender, price)
      ).toBe(true);
    });
  });
});
