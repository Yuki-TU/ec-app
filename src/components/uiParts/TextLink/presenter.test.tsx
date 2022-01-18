import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextLink } from '.';
import { useStyles } from './style';

// スタイルを指定するuseStyles関数はモック化
jest.mock('./style');
const mockUseStyles = useStyles as jest.Mock;

describe('TextLinkコンポーネントはパイパーリンクを表示する', () => {
  test('labelに指定した文字をリンク文字列として表示している', () => {
    // モックの帰り値を指定
    mockUseStyles.mockReturnValue({});

    // レンダリング
    render(<TextLink label="メールアドレス" onClick={() => {}} />);

    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
  });

  test('マウスでリンクを押したら、onClickに指定したコールバック関数が実行される', () => {
    // モックの返り値を指定
    mockUseStyles.mockReturnValue({});

    // モック関数を定義
    const onClickMock = jest.fn();

    // コンポーネントレンダリング
    render(<TextLink label="メールアドレス" onClick={onClickMock} />);

    // リンクテキストをクリック
    const linkText = screen.getByText('メールアドレス');
    userEvent.click(linkText);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('タブ選択してエンターを押すと、onClickに指定したコールバック関数が実行される', () => {
    // モックの返り値を指定
    mockUseStyles.mockReturnValue({});

    // モック関数を定義
    const onClickMock = jest.fn();

    // コンポーネントレンダリング
    render(<TextLink label="メールアドレス" onClick={onClickMock} />);

    // タブ選択し、エンターを押す
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
