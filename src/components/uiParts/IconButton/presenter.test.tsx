import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { IconButton } from '.';

describe('IconButtonコンポーネントは、アイコン付きのボタンを表示するコンポーネント', () => {
  test('labelに指定した文字を表示する', () => {
    const onClick = jest.fn();

    render(<IconButton label="ラベル" icon={<div />} onClick={onClick} />);
    expect(screen.getByText('ラベル')).toBeInTheDocument();
  });

  test('アイコンをクリックするとonClickに指定したコールバックを呼び出す', () => {
    const onClickMock = jest.fn();

    // レンダリング
    render(<IconButton label="ラベル" icon={<div />} onClick={onClickMock} />);

    // クリック操作
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
