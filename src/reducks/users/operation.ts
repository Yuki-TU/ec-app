import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { push } from 'connected-react-router';
import { auth, db, firebaseTimestamp } from '../../firebase/index';

/**
 * firebasestoreにデータを保存
 * @param collection firestoreのコレクション名
 * @param key キーとする値
 * @param data 保存したいデータ
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
 * firebasestoreからのデータ取得
 * @param collection firebaseのコレクション名
 * @param key キーとする値
 * @returns 取得データ
 */
async function fetchDataFromDatabase<T>(collection: string, key: string) {
  try {
    const referenceData = doc(db, collection, key);
    const result = await getDoc(referenceData);
    // 取得データを型変換して返却
    return result.data() as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('failed to fetch firestore');
  }
}
/**
 * アカウント作成とアカウント情報をデータベースに登録するコールバック関数の定義
 * @param username 登録したいユーザー情報
 * @param email 登録したいemailアドレス
 * @param password 登録したいパスワード
 * @returns コールバック関数
 */
export function signUp(username: string, email: string, password: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // firebaseに対してメールとパスワードでユーザ登録
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        const timestamp = firebaseTimestamp.now();
        // データベースに登録する情報
        const userInitialData = {
          customer_id: '',
          created_at: timestamp,
          email,
          role: 'customer',
          payment_method_id: '',
          uid: user.uid,
          updated_at: timestamp,
          username,
        };

        // ユーザー情報をデータベースに登録
        // データベースのusersコレクションに、ユーザ登録でランダムに作成されたユーザidをキーに各ユーザ情報を登録
        await saveDataToDatabase('users', user.uid, userInitialData);
        // 登録が成功したら、ホームに戻る
        dispatch(push('/'));
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('ユーザ登録に失敗しました。時間を置いてもう一度お試しください。');
        throw new Error(error.message);
      }
    }
  };
}
