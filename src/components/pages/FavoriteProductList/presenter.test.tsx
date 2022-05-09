import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useQuery } from 'react-query';
import { FavoriteProductList } from '.';
import { useSelector } from '../../../reducks/store';
import { loadFavoriteProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';

// モジュールのモック化
jest.mock('connected-react-router', () => jest.fn());
jest.mock('react-redux');
jest.mock('react-query');
jest.mock('../../../reducks/users/selectors');
jest.mock('../../../reducks/store');
jest.mock('../../../repository/product');
jest.mock('../../../firebase', () => {});

// const mockUseDispatch = useDispatch as jest.Mock;
const mockUseSelector = useSelector as jest.Mock;
const mockLoadFavoriteProducts = loadFavoriteProducts as unknown as jest.Mock;
const mockProductFirebaseRepository = ProductFirebaseRepository as jest.Mock;
const mockUseQuery = useQuery as jest.Mock;

beforeEach(() => {
  mockProductFirebaseRepository.mockClear();
});

describe('FavoriteProductListコンポーネントはお気に入り商品一覧を表示する', () => {
  test('お気に入り商品がない場合は「お気に入りした商品がありません」と表示する', async () => {
    // モックの帰り値を指定
    mockUseQuery.mockReturnValue({});
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
      render(<FavoriteProductList />);
    });
    expect(
      screen.getByText('お気に入りした商品がありません')
    ).toBeInTheDocument();
  });
  test.skip('お気に入り商品がある場合は商品リスト一覧を表示する', () => {});
  test('ヘッダーテキストに「お気に入り商品」と表示する', async () => {
    // モックの帰り値を指定
    mockUseSelector.mockReturnValue({});
    mockLoadFavoriteProducts.mockReturnValue([]);
    mockUseQuery.mockReturnValue({});
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
      render(<FavoriteProductList />);
    });
    expect(screen.getByText('お気に入り商品')).toBeInTheDocument();
  });
});
