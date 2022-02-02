import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStyles } from './style';
import { ProductCard } from '.';
import { firebaseTimestamp } from '../../../../firebase';
import noImage from '../../../../assets/images/no_image.png';

// スタイルを指定するuseStyles関数はモック化
jest.mock('./style');
const mockUseStyles = useStyles as jest.Mock;
jest.mock('firebase/firestore');

describe('商品情報カードコンポーネントは商品情報を表示する', () => {
  describe('値段は、３桁金馬区切りで円マークを接頭語に表示する', () => {
    test('20000は¥20,000と表示する', () => {
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
        updated_at: firebaseTimestamp.now(),
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
          updated_at: firebaseTimestamp.now(),
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
  });
});
