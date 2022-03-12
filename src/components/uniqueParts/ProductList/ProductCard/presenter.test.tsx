import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '.';
import noImage from '../../../../assets/images/no_image.png';
import { useStyles } from './style';

// スタイルを指定するuseStyles関数はモック化
jest.mock('./style');
jest.mock('react-redux');
jest.mock('connected-react-router', () => jest.fn());
// firebaseの取得メソッドをモック(CIでのテストで必要)
jest.mock('../../../../firebase', () => {});

const mockUseStyles = useStyles as jest.Mock;
const mockTimestamp = jest.fn() as unknown as Timestamp;
const mockUseDispatch = useDispatch as jest.Mock;

describe('商品情報カードコンポーネントは商品情報を表示する', () => {
  describe('値段は、３桁金馬区切りで円マークを接頭語に表示する', () => {
    test('20000は¥20,000と表示する', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});

      const productMock = {
        name: 'ラーメン',
        description: '',
        category: '',
        gender: '',
        price: 20000,
        id: '',
        images: [
          {
            id: '',
            path: noImage,
          },
        ],
        updated_at: mockTimestamp,
      };
      render(
        <ProductCard
          name={productMock.name}
          description={productMock.description}
          category={productMock.category}
          gender={productMock.gender}
          price={productMock.price}
          id={productMock.id}
          images={productMock.images}
          updated_at={productMock.updated_at}
        />
      );
      expect(screen.getByText('¥20,000')).toBeInTheDocument();
    });
  });
  describe('商品名を表示する', () => {
    test('商品名ラーメンであれば、ラーメンと表示する', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});

      const productMock = {
        name: 'ラーメン',
        description: '',
        category: '',
        gender: '',
        price: 20000,
        id: '',
        images: [
          {
            id: '',
            path: noImage,
          },
        ],
        updated_at: mockTimestamp,
      };
      render(
        <ProductCard
          name={productMock.name}
          description={productMock.description}
          category={productMock.category}
          gender={productMock.gender}
          price={productMock.price}
          id={productMock.id}
          images={productMock.images}
          updated_at={productMock.updated_at}
        />
      );
      expect(screen.getByText('ラーメン')).toBeInTheDocument();
    });
  });
  describe('各商品カードにはメニューボタンが表示される', () => {
    test('メニューの一つである編集するボタンが表示されている', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});

      const productMock = {
        name: 'ラーメン',
        description: '',
        category: '',
        gender: '',
        price: 20000,
        id: '',
        images: [
          {
            id: '',
            path: noImage,
          },
        ],
        updated_at: mockTimestamp,
      };
      render(
        <ProductCard
          name={productMock.name}
          description={productMock.description}
          category={productMock.category}
          gender={productMock.gender}
          price={productMock.price}
          id={productMock.id}
          images={productMock.images}
          updated_at={productMock.updated_at}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.getByText('編集する')).toBeInTheDocument();
    });
    test('メニューの一つである削除するボタンが表示されている', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});

      const productMock = {
        name: 'ラーメン',
        description: '',
        category: '',
        gender: '',
        price: 20000,
        id: '',
        images: [
          {
            id: '',
            path: noImage,
          },
        ],
        updated_at: mockTimestamp,
      };
      render(
        <ProductCard
          name={productMock.name}
          description={productMock.description}
          category={productMock.category}
          gender={productMock.gender}
          price={productMock.price}
          id={productMock.id}
          images={productMock.images}
          updated_at={productMock.updated_at}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.getByText('削除する')).toBeInTheDocument();
    });
  });
});
