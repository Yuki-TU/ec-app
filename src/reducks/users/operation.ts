import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { push } from 'connected-react-router';
import { auth, db, firebaseTimestamp } from '../../firebase/index';
import { signInAction } from './update';
import { User } from './types';

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
/**
 * emailとパスワードでサイン処理するコールバック関数の定義
 * @param email Eメール
 * @param password パスワード
 * @returns ログイン処理のコールバック関数
 */
export function signIn(email: string, password: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchDataFromDatabase<User>('users', user.uid);
      if (!userData) {
        alert('不具合が発生しました。アカウントを作り直してください。');
        return;
      }
      dispatch(
        signInAction({
          customer_id: userData.customer_id,
          email: userData.email,
          isSignedIn: true,
          payment_method_id: userData.payment_method_id,
          role: userData.role,
          uid: user.uid,
          username: userData.username,
        })
      );
      // サインインしたらトップページへ遷移
      dispatch(push('/'));
    } catch (error) {
      if (error instanceof Error) {
        alert(
          '認証に失敗しました。IDとパスワードが正しいかもう一度ご確認ください。'
        );
        throw new Error(error.message);
      }
    }
  };
}
/**
 * メールアドレスの検証
 * @param email - 検証したいEメール
 * @return (true: OK, false: NG)
 */
export const isValidEmailFormat = (email: string) => {
  const regex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return regex.test(email);
};
/**
 * 入力値の配列に空文字があるかを判断する、
 * 一つでも空文字があれば、falseを返す
 * @param args - 文字列の配列
 * @return (true: 空文字がない, false: 空文字がある)
 */
export const isValidRequiredInput = (args: string[]): boolean => {
  let validator = true;
  args.forEach((arg: string) => {
    if (arg === '') {
      validator = false;
    }
  });
  return validator;
};
