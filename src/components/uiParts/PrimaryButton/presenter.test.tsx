import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrimaryButton } from '.';

describe('PrimeButtonンポーネントは汎用ボタンを表示', () => {
  beforeEach(() => {
    render(<PrimaryButton label="ok" type="button" />);
  });
  test('ボタンタグを表示している', () => {
    expect(screen.getByRole('button')).toBeEnabled();
  });
  test('labelに指定した文字を表示している', () => {
    expect(screen.queryByText('ok')).toBeInTheDocument();
  });
});
