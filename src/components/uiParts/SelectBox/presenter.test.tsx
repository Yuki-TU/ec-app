import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectBox } from '.';
import { useStyles } from './style';

// スタイルを指定するuseStyles関数はモック化
jest.mock('./style');
const mockUseStyles = useStyles as jest.Mock;

describe('SelectBoxコンポーネントはプルダウンの選択ボックスを表示する', () => {
  test('labelに指定した文字はSelectBoxの表示文字列として表示する', () => {
    // モックの帰り値を指定
    mockUseStyles.mockReturnValue({});
    const valueMock = '';
    const itemsMock = [
      { id: 'male', name: 'メンズ' },
      { id: 'female', name: 'レディース' },
      { id: 'unisex', name: 'ユニセックス' },
    ];

    render(
      <SelectBox
        label="性別"
        required
        selectedItem={valueMock}
        items={itemsMock}
        onChange={() => {}}
      />
    );
    expect(screen.getByText('性別')).toBeInTheDocument();
  });

  test('SelctBoxをクリックするとアイテム一覧が表示され、そのうちの一つをクリックしたら、onChangeに指定したコールバック関数が実行される', () => {
    // モックの返り値を指定
    mockUseStyles.mockReturnValue({});
    // モック関数を定義
    const onChangekMock = jest.fn();
    const mockValue = '';
    const itemsMock = [
      { id: 'male', name: 'メンズ' },
      { id: 'female', name: 'レディース' },
      { id: 'unisex', name: 'ユニセックス' },
    ];

    // コンポーネントレンダリング
    render(
      <SelectBox
        label="性別"
        required
        selectedItem={mockValue}
        items={itemsMock}
        onChange={onChangekMock}
      />
    );

    // selectBoxをクリック
    const selectBox = screen.getByRole('button');
    userEvent.click(selectBox);
    // itemsのうちメンズをクリック
    const mensItem = screen.getByText('メンズ');
    userEvent.click(mensItem);

    expect(onChangekMock).toHaveBeenCalledTimes(1);
  });

  test('マウスでSelectBoxをクリックすると、アイテム一覧が全て表示される', () => {
    // モックの返り値を指定
    mockUseStyles.mockReturnValue({});
    // モック関数を定義
    const onChangekMock = jest.fn();
    const mockValue = '';
    const itemsMock = [
      { id: 'male', name: 'メンズ' },
      { id: 'female', name: 'レディース' },
      { id: 'unisex', name: 'ユニセックス' },
    ];

    // コンポーネントレンダリング
    render(
      <SelectBox
        label="性別"
        required
        selectedItem={mockValue}
        items={itemsMock}
        onChange={onChangekMock}
      />
    );

    // selectBoxの部分をクリック
    const selectBox = screen.getByRole('button');
    userEvent.click(selectBox);

    expect(screen.getByText('メンズ')).toBeInTheDocument();
    expect(screen.getByText('レディース')).toBeInTheDocument();
    expect(screen.getByText('ユニセックス')).toBeInTheDocument();
  });
});
