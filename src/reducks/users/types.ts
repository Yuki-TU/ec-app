import { Timestamp } from 'firebase/firestore';

/** reduxで扱うユーザー情報の型 */
export type User = {
  customer_id: string;
  email: string;
  isSignedIn: boolean;
  role: string;
  payment_method_id: string;
  uid: string;
  username: string;
};

/** データベースで保存するユーザ情報の型 */
export type UserForDatabase = {
  customer_id: string;
  created_at: Timestamp;
  email: string;
  role: string;
  payment_method_id: string;
  uid: string;
  updated_at: Timestamp;
  username: string;
  /** お気に入り商品id一覧 */
  favorite_products: string[];
};
