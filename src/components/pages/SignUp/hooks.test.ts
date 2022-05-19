import { act, renderHook } from '@testing-library/react-hooks';
import { useInputValue, validatePassword } from './hooks';

describe('validPasswordはパスワードと確認パスワードが一致するか判断', () => {
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
describe('useInputValue関数は、ステートとステートを更新する関数を返すカスタムフック', () => {
  test('valueは引数を指定しなければ、初期値は0である', () => {
    const { result } = renderHook(() => useInputValue());
    expect(result.current[0]).toEqual('');
  });

  test('「test」が入力するとステートのvalueは「test」となる', () => {
    const { result } = renderHook(() => useInputValue());
    const updateValue = result.current[1];
    const mockInput = jest.fn(() => ({
      target: { value: 'test' },
    })) as unknown as () => React.ChangeEvent<HTMLInputElement>;

    act(() => {
      updateValue(mockInput());
    });
    expect(result.current[0]).toEqual('test');
  });
});
