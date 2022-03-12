import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { FavoriteProductList } from '.';
import { useSelector } from '../../../reducks/store';
import { loadFavoriteProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { useStyles } from './style';

// モジュールのモック化
jest.mock('./style');
jest.mock('../../../reducks/users/selectors');
jest.mock('../../../reducks/store');
jest.mock('../../../repository/product');

// const mockUseDispatch = useDispatch as jest.Mock;
const mockUseStyles = useStyles as jest.Mock;
const mockUseSelector = useSelector as jest.Mock;
const mockLoadFavoriteProducts = loadFavoriteProducts as unknown as jest.Mock;
const mockProductFirebaseRepository = ProductFirebaseRepository as jest.Mock;

beforeEach(() => {
  mockProductFirebaseRepository.mockClear();
});

describe('FavoriteProductListコンポーネントはお気に入り商品一覧を表示する', () => {
  test('お気に入り商品がない場合は「お気に入りした商品がありません」と表示する', () => {
    // モックの帰り値を指定
    mockUseStyles.mockReturnValue({});
    mockUseSelector.mockReturnValue({});
    mockLoadFavoriteProducts.mockReturnValue([]);
    mockProductFirebaseRepository.mockImplementationOnce(() => {
      return {
        findByIds: () => {
          return {
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
          };
        },
      };
    });

    waitFor(() => {
      render(<FavoriteProductList />);
      expect(
        screen.getByText('お気に入りした商品がありません')
      ).toBeInTheDocument();
    });
  });
  test.skip('お気に入り商品がある場合は商品リスト一覧を表示する', () => {});
  test('ヘッダーテキストに「お気に入り商品」と表示する', () => {
    // モックの帰り値を指定
    mockUseStyles.mockReturnValue({});
    mockUseSelector.mockReturnValue({});
    mockLoadFavoriteProducts.mockReturnValue([]);
    mockProductFirebaseRepository.mockImplementationOnce(() => {
      return {
        findByIds: () => {
          return {
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
          };
        },
      };
    });

    waitFor(() => {
      render(<FavoriteProductList />);
      expect(screen.getByText('お気に入り商品')).toBeInTheDocument();
    });
  });
});
