import React from 'react';
import { useDispatch } from 'react-redux';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProductEdit } from '.';
import { useStyles } from './style';
import { useStyles as buttonUseStyle } from '../../uiParts/PrimaryButton/style';
import { loadUserId } from '../../../reducks/users/selectors';

// モジュールのモック化
jest.mock('connected-react-router', () => jest.fn());
jest.mock('react-redux');
jest.mock('./style');
jest.mock('../../uiParts/PrimaryButton/style');
jest.mock('../../../firebase', () => {});
jest.mock('../../../reducks/users/selectors');

const mockUseDispatch = useDispatch as jest.Mock;
const mockUseStyles = useStyles as jest.Mock;
const mockButtonStyle = buttonUseStyle as jest.Mock;
const mockLoadUserId = loadUserId as unknown as jest.Mock;

describe('ProductEditコンポーネントは、商品情報を登録する画面', () => {
  test('性別を選ぶ選択を選ぶ欄がある', () => {
    // モックの返り値を指定
    mockUseStyles.mockReturnValue({});
    mockUseDispatch.mockReturnValue({});
    mockButtonStyle.mockReturnValue({});
    mockLoadUserId.mockReturnValue('1111');

    render(<ProductEdit />);

    expect(screen.getByText('性別')).toBeInTheDocument();
  });
});
