import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '.';
import noImage from '../../../../assets/images/no_image.png';
import { loadUserId } from '../../../../reducks/users/selectors';
import { useStyles } from './style';

// スタイルを指定するuseStyles関数はモック化
jest.mock('./style');
jest.mock('react-redux');
jest.mock('connected-react-router', () => jest.fn());
// firebaseの取得メソッドをモック(CIでのテストで必要)
jest.mock('../../../../firebase', () => {});
jest.mock('../../../../reducks/users/selectors');

const mockUseStyles = useStyles as jest.Mock;
const mockTimestamp = jest.fn() as unknown as Timestamp;
const mockUseDispatch = useDispatch as jest.Mock;
const mockLoadUserId = loadUserId as unknown as jest.Mock;

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
        owner: '111',
        purchaser: '22',
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
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
        owner: '111',
        purchaser: '222',
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
        />
      );
      expect(screen.getByText('ラーメン')).toBeInTheDocument();
    });
  });
  describe('購入者がいない、かつ、商品編集者とログインユーザが同じ場合各商品カードにはメニューボタンが表示される', () => {
    test('purchaserが空文字、かつ、商品編集者とログインユーザが同じ場合は、メニューの一つである編集するボタンが表示されている', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});
      mockLoadUserId.mockReturnValue('1111');

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
        owner: '1111',
        purchaser: '',
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.getByText('編集する')).toBeInTheDocument();
    });
    test('purchaserが空文字、かつ、商品編集者とログインユーザが同じ場合は、メニューの一つである削除するボタンが表示されている', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});
      mockLoadUserId.mockReturnValue('1111');

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
        owner: '1111',
        purchaser: '',
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.getByText('削除する')).toBeInTheDocument();
    });
    test('purchaserが空文字、かつ、商品編集者とログインユーザが異なる場合は、メニューボタンが表示されない', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});
      mockLoadUserId.mockReturnValue('2222');

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
        owner: '1111',
        purchaser: '',
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.queryByText('削除する')).not.toBeInTheDocument();
    });
  });
  describe('購入者がいる場合メニューボタンは、出品者にも表示されない', () => {
    test('purchaserに値がある、かつ、商品編集者とログインユーザが同じ場合は、メニューの一つである編集するボタンは表示されない。', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});
      mockLoadUserId.mockReturnValue('1111');

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
        owner: '1111',
        purchaser: '1111', // 購入者がいる
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.queryByText('編集する')).not.toBeInTheDocument();
    });
    test('purchaserに値がある、かつ、商品編集者とログインユーザが異なる場合は、メニューボタンの一つである編集するボタンは表示されない', () => {
      // モックの帰り値を指定
      mockUseStyles.mockReturnValue({});
      mockUseDispatch.mockReturnValue({});
      mockLoadUserId.mockReturnValue('2222');

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
        owner: '1111',
        purchaser: '88', // 購入者がいる
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
          owner={productMock.owner}
          purchaser={productMock.purchaser}
        />
      );
      userEvent.tab();
      userEvent.keyboard('{Enter}');

      expect(screen.queryByText('購入する')).not.toBeInTheDocument();
    });
  });
});
