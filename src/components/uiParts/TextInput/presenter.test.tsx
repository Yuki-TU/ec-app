import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextInput } from '.';

describe('TextInputコンポーネントはテキスト入力を表示する', () => {
  beforeEach(() => {
    render(
      <TextInput
        fullWidth={false}
        label="メールアドレス"
        value="test@gmail.com"
        required
        rows={1}
        multiline
        type="email"
        onChange={() => {}}
      />
    );
  });
  test('初期値が正しくセットされている', () => {
    expect(screen.getByDisplayValue('test@gmail.com')).toBeInTheDocument();
  });
  test('labelに指定した文字を表示している', () => {
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
  });
});
