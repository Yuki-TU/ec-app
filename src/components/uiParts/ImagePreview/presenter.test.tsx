import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImagePreview } from '.';

describe('ImagePreviewコンポーネントはプレビュー画像を表示する', () => {
  test('altに指定した文字列は代替文字として表示している', () => {
    // レンダリング
    render(
      <ImagePreview alt="プレビュー画像" onClick={() => {}} path="./" id="id" />
    );
    expect(screen.getByAltText('プレビュー画像')).toBeInTheDocument();
  });
  test('画像をクリックすると、onClickに指定したコールバック関数が実行される', () => {
    // モック関数を定義
    const onClickMock = jest.fn();

    render(
      <ImagePreview
        alt="プレビュー画像"
        onClick={onClickMock}
        path="./"
        id="id"
      />
    );

    // ユーザ操作
    const linkText = screen.getByAltText('プレビュー画像');
    userEvent.click(linkText);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
