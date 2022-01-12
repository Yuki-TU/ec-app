import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './config';

// firebaseの初期化
initializeApp(firebaseConfig);

// firebaseで利用するメソッドをエクスポート
/** ユーザー情報を取り扱うインスタンス情報 */
export const auth = getAuth();
/** データベースを取り扱うためのインスタンス情報 */
export const db = getFirestore();
/** バックエンドコードを取り扱うためのインスタンス情報 */
export const functions = getFunctions();
/** ストレージ(画像などを保存など)情報を取り扱うインスタンス情報 */
export const storage = getStorage();
/** タイムスタンプを扱うインスタンス情報 */
export const firebaseTimestamp = Timestamp;
