import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ExhibitedProductList } from '.';
import { useSelector } from '../../../reducks/store';
import { loadFavoriteProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { useStyles } from './style';

// モジュールのモック化
jest.mock('connected-react-router', () => jest.fn());
jest.mock('react-redux');
jest.mock('./style');
jest.mock('../../../reducks/users/selectors');
jest.mock('../../../reducks/store');
jest.mock('../../../repository/product');
jest.mock('../../../firebase', () => {});

// const mockUseDispatch = useDispatch as jest.Mock;
const mockUseStyles = useStyles as jest.Mock;
const mockUseSelector = useSelector as jest.Mock;
const mockLoadFavoriteProducts = loadFavoriteProducts as unknown as jest.Mock;
const mockProductFirebaseRepository = ProductFirebaseRepository as jest.Mock;

beforeEach(() => {
  mockProductFirebaseRepository.mockClear();
});

describe('ExhibitedProductListコンポーネントは出品商品一覧を表示する', () => {
  test('出品商品がない場合は「出品した商品がありません」と表示する', async () => {
    // モックの帰り値を指定
    mockUseStyles.mockReturnValue({});
    mockUseSelector.mockReturnValue({});
    mockLoadFavoriteProducts.mockReturnValue([]);
    mockProductFirebaseRepository.mockImplementationOnce(() => ({
      findByIds: () => ({
        name: '',
        description: '',
        category: '',
        gender: '',
        price: 0,
        id: '',
        images: [
          {
            id: '',
            path: '',
          },
        ],
        updated_at: '',
      }),
    }));

    await waitFor(() => {
      render(<ExhibitedProductList />);
    });
    expect(screen.getByText('出品した商品がありません')).toBeInTheDocument();
  });

  test.skip('出品商品がある場合は商品リスト一覧を表示する', () => {});

  test('ヘッダーテキストに「出品商品」と表示する', async () => {
    // モックの帰り値を指定
    mockUseStyles.mockReturnValue({});
    mockUseSelector.mockReturnValue({});
    mockLoadFavoriteProducts.mockReturnValue([]);
    mockProductFirebaseRepository.mockImplementationOnce(() => ({
      findByIds: () => ({
        name: '',
        description: '',
        category: '',
        gender: '',
        price: 0,
        id: '',
        images: [
          {
            id: '',
            path: '',
          },
        ],
        updated_at: '',
      }),
    }));

    await waitFor(() => {
      render(<ExhibitedProductList />);
    });
    expect(screen.getByText('出品商品')).toBeInTheDocument();
  });
});
