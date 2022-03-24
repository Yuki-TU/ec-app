import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { collection as firebaseCollection, doc } from 'firebase/firestore';

import { db, firebaseTimestamp } from '../../firebase/index';
import { ProductFirebaseRepository } from '../../repository/product';
import { deleteProductAction, fetchProductsAction } from './updates';
import { ProductForDatabase } from './types';
import { RootState } from '../store';
import {
  addExhibitedProduct,
  removeExhibitedProduct,
} from '../users/operations';

/**
 * 商品登録登録し、成功したらホームに戻るコールバックの定義
 * @param name 商品名
 * @param description 商品説明
 * @param category 商品カテゴリー
 * @param gender 性別
 * @param price 値段
 * @param owner 商品出品者のユーザid
 * @returns 商品登録するコールバック
 */
export function saveProduct(
  productId: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  images: { id: string; path: string }[],
  price: string,
  owner: string
) {
  return async (dispatch: Dispatch<unknown>) => {
    const nowTimeStamp = firebaseTimestamp.now();
    // 編集する商品のproductidを代入
    let id = productId;

    // productidがなれば、編集画面ではなく新規作成と判断
    if (!id) {
      // 新規作製の処理
      // 保存されるデータのキーであるidをデータとして保存したいため先に取得
      id = doc(firebaseCollection(db, 'products')).id;
    }

    const savedData = {
      category,
      description,
      gender,
      id,
      images,
      name,
      price: parseInt(price, 10),
      updated_at: nowTimeStamp,
      owner,
    };
    try {
      const productRepository = new ProductFirebaseRepository();
      await productRepository.save(savedData);

      // 商品追加をユーザ管理
      dispatch(addExhibitedProduct(id));

      // 保存が成功したらホームへ
      dispatch(push('/'));
    } catch (error) {
      throw new Error('failed to save the product data');
    }
  };
}

/**
 * 指定の商品情報をDB、ストアより削除する
 * @param id 削除したい商品いd
 * @returns 商品削除するコールバック
 */
export function deleteProduct(id: string) {
  return async (dispatch: Dispatch<unknown>, getState: () => RootState) => {
    try {
      // データベースの商品を削除
      const productRepository = new ProductFirebaseRepository();
      await productRepository.delete(id);

      // 商品削除をユーザ管理
      dispatch(removeExhibitedProduct(id));

      // 削除した商品以外の商品リストを作成
      const prevProducts = getState().products.list;
      const newProducts = prevProducts.filter(
        (product: ProductForDatabase) => product.id !== id
      );

      // ストアの商品リストを削除した商品以外の商品リストで更新
      dispatch(deleteProductAction(newProducts));
    } catch (error) {
      throw new Error('商品情報の削除に失敗しました。');
    }
  };
}

/**
 * 商品情報を全データを取得し、ストアに管理するコールバックの定義
 * @returns コールバック関数
 */
export function fetchProducts() {
  return async (dispatch: Dispatch<Action>) => {
    // 商品データの取得
    const productRepository = new ProductFirebaseRepository();
    const productList = await productRepository.fetchAll();

    // 商品全情報をストアに保存
    dispatch(fetchProductsAction(productList));
  };
}
