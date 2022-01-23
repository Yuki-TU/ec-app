import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import {
  collection as firebaseCollection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db, firebaseTimestamp } from '../../firebase/index';

/**
 * firestoreデータベースにデータを保存する
 * @param collection コレクション
 * @param key キー
 * @param data 保存するデータ
 */
async function saveDataToDatabase<T>(collection: string, key: string, data: T) {
  try {
    await setDoc(doc(db, collection, key), data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
/**
 * 商品登録登録し、成功したらホームに戻るコールバックの定義
 * @param name 商品名
 * @param description 商品説明
 * @param category 商品カテゴリー
 * @param gender 性別
 * @param price 値段
 * @returns 商品登録するコールバック
 */
export function saveProduct(
  name: string,
  description: string,
  category: string,
  gender: string,
  images: { id: string; path: string }[],
  price: string
) {
  return async (dispatch: Dispatch<Action>) => {
    const nowTimeStamp = firebaseTimestamp.now();
    // 保存されるデータのキーであるidをデータとして保存したいため先に取得
    const { id } = doc(firebaseCollection(db, 'products'));

    const savedData = {
      category,
      description,
      gender,
      id,
      images,
      name,
      price: parseInt(price, 10),
      updated_at: nowTimeStamp,
    };
    try {
      await saveDataToDatabase('products', id, savedData);
      // 保存が成功したらホームへ
      dispatch(push('/'));
    } catch (error) {
      throw new Error('failed to save the product data');
    }
  };
}
