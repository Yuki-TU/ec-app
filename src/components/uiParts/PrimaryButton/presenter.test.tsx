import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrimaryButton } from '.';
import { useStyles } from './style';

// スタイル指定のuseStyles関数はメソッド化
jest.mock('./style');
const mockUseStyles = useStyles as jest.Mock;

describe('PrimeButtonンポーネントは汎用ボタンを表示', () => {
  beforeEach(() => {
    // useStyleの返り値を空のオブジェクトに設定
    mockUseStyles.mockReturnValue({});
    render(<PrimaryButton label="ok" type="button" />);
  });
  test('ボタンタグを表示している', () => {
    expect(screen.getByRole('button')).toBeEnabled();
  });
  test('labelに指定した文字を表示している', () => {
    expect(screen.queryByText('ok')).toBeInTheDocument();
  });
});
