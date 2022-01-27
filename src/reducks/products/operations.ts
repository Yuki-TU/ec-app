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
    await setDoc(doc(db, collection, key), data, { merge: true });
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
  productId: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  images: { id: string; path: string }[],
  price: string
) {
  return async (dispatch: Dispatch<Action>) => {
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
